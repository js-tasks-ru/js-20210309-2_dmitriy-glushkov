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

    const icmp = a.toLowerCase().localeCompare(b.toLowerCase());

    if (icmp !== 0) {
      // spotted a difference when considering the locale
      return icmp;
    }

    // no difference found when considering locale, let's see whether
    // capitalization matters
    if (a > b) {
      return 1;

    } else if (a < b) {
      return -1;
    } else {
      // the characters are equal.
      return 0;
    }
  });


  if (param === 'desc') {
    return arrToReturn.reverse();
  } else {
    return arrToReturn;
  }
}
