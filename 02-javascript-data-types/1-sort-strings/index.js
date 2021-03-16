/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */
export function sortStrings(arr, param = 'asc') {

  const arrToReturn = [];

  for (let item of arr) {
    arrToReturn.push(item);
  }

  arrToReturn.sort(function (a, b) {

    if (param === 'desc') {
      [a, b] = [b, a];
    }

    const icmp = a.localeCompare(b, undefined, { caseFirst: 'upper' });

    if (icmp !== 0) {
      // spotted a difference when considering the locale
      return icmp;
    }
  });

  return arrToReturn;
}
