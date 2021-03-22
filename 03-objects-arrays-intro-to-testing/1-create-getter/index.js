/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {

  const pathInObj = path.split(".");

  return function (obj) {

    for (let i = 0; i < pathInObj.length; i++) {

      if (Object.keys(obj).length === 0) {
        return;
      }

      let map = new Map(Object.entries(obj));
      obj = map.get(pathInObj[i]);
    }
    return obj;
  };
}
