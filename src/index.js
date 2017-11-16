function createIs (names, target) {
  const { is, not } = names.reduce(({is, not}, name) => {
    is = { ...is, [name]: name === target};
    not = { ...not, [name]: !is[name] };
    return { is, not };
  }, { is: {}, not: {} });

  is.not = not;

  return is;
}

function isLowercase (str) {
  return /^[a-z_]+$/.test(str);
}

function validate (status) {
  const names = Object.keys(status);

  if (names.some(isLowercase)) {
    console.warn('[status] Use uppercase for status names');
  }
}

export default function (status) {
  validate(status);

  const names = Object.keys(status);
  // Id 索引
  const store = {};
  const enums = [];

  const obj = names.reduce((obj, name) => {
    const state = {
      ...status[name],
      is: createIs(names, name),
    };

    store[state.id] = state;
    obj[name] = state;
    return obj;
  }, {});

  obj.getById = id => store[id];
  obj.enums = enums;

  return obj;
}
