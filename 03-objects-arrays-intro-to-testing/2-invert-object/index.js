/**
 * invertObj - should swap object keys and values
 * @param {object} obj - the initial object
 * @returns {object | undefined} - returns new object or undefined if nothing did't pass
 */
export function invertObj(obj) {

  if (obj === undefined) {
    return;
  }

  if (Object.keys(obj).length === 0) {
    return {};
  }

  const resultObj = {};

  for (let keyValue of Object.entries(obj)) {

    resultObj[keyValue[1]] = keyValue[0];
  }
  return resultObj;
}
