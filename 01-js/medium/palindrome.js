/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let string = str.toLowerCase();
  let filteredString = "";

  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if ((char >= "0" && char <= "9") || (char >= "a" && char <= "z")) {
      filteredString += char;
    }
  }
  console.log(filteredString);

  let reversedStr = "";

  for (let i = filteredString.length - 1; i >= 0; i--) {
    reversedStr += filteredString[i];
  }

  return filteredString === reversedStr;
}

console.log(isPalindrome("vianl"));

module.exports = isPalindrome;
