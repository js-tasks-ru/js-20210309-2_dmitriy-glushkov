/**
 * pick - Creates an object composed of the picked object properties:
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to pick
 * @returns {object} - returns the new object
 */
export function pick(obj, ...fields) {

  let resultObj = {}

  for (let item in obj){
    if (fields.includes(item)){

      resultObj[item] = obj[item];

    }
  }
  return resultObj
}


