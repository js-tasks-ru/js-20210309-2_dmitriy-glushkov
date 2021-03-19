/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {

  if (arr === undefined || arr.length === 0) {
    return [];
  }


  const set = new Set();

  for (let char of arr) {
    set.add(char);
  }
  return Array.from(set);
}
