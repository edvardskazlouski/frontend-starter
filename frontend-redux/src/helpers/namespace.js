export default function namespace(obj, namespace, separator = '.') {
  const keys = Object.keys(obj);

  return keys.reduce((accumulator, key) => {
    accumulator[key] = `${namespace}${separator}${key}`;

    return accumulator;
  }, {});
}
