export default base => extension => ({
  ...base,
  ...extension,
  id: base.id,
});
