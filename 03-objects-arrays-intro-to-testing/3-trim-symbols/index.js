/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {

  if (string === '' || size === 0) {
    return '';
  }
  if (size === undefined) {
    return string;
  }

  let resString = '';
  let tmpArr = [];

  for (let charPos = 0; charPos < string.length; charPos++) {

    tmpArr.push(string[charPos]);

    if (string[charPos] !== string[charPos + 1]) {

      const charsToAdd = (size < tmpArr.length) ? size : tmpArr.length;

      for (let char = 0; char < charsToAdd; char++) {
        resString = resString + tmpArr[char];
      }
      tmpArr = [];
    }
  }
  return resString;
}
