const prefixMsg = str => `[enumStatus] ${str}`;

export const warn = str => {
  console.log(prefixMsg(str));
  console.trace();
}

export const typeError = str => {
  const msg = prefixMsg(str);
  throw new TypeError(msg);
}
