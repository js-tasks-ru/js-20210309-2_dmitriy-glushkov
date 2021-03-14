/**
 * omit - creates an object composed of enumerable property fields
 * @param {object} obj - the source object
 * @param {...string} fields - the properties paths to omit
 * @returns {object} - returns the new object
 */
export function omit(obj, ...fields)  {

  let resultObj = {}

  for (let item in obj){
    if (!fields.includes(item)){

      resultObj[item] = obj[item];

    }
  }
  return resultObj
}
