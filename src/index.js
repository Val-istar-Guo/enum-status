import { warn, typeError } from './log';


const createIs = (names, target) => {
  const { is, not } = names.reduce(({is, not}, name) => {
    is = { ...is, [name]: name === target};
    not = { ...not, [name]: !is[name] };
    return { is, not };
  }, { is: {}, not: {} });

  is.not = not;

  return is;
};

const isLowercase = (str) => {
  return /^[a-z_]+$/.test(str);
};

const validate = table => {
  const names = Object.keys(table);

  // NOTE: should i warn?
  // if (!names.length) {
  //   warn('no status is defined, are you sure?');
  // }

  if (names.some(isLowercase)) {
    warn('Use uppercase for status names');
  }

  names.forEach(name => {
    if (!('id' in table[name])) {
      typeError(`${name} state have not prop id`);
    }
  });
}

const createState = (options, name, names) => ({
  ...options,
  is: createIs(names, name),
});

export default table => {
  validate(table);

  const names = Object.keys(table);
  const idMap = {};
  const nameMap = {};
  const enums = [];
  let defaultValue = undefined;

  names.forEach(name => {
    const state = createState(table[name], name, names);

    idMap[state.id] = state;
    nameMap[name] = state;
    enums.push(state);
  });

  const status = {
    ...nameMap,
    getById: id => idMap[id] || defaultValue,
    enums: enums,
    default: value => {
      if (!(value in nameMap)) {
        typeError(`default value name(${value}) is undefined`);
      }

      defaultValue = nameMap[value];

      return status;
    },
  };

  return status;
};
