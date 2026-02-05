/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
  let finalStr = str.toLowerCase();
  let vowels = ["a", "e", "i", "o", "u"];
  let numberOfVowels = 0;
  for (let i = 0; i < finalStr.length; i++) {
    if (vowels.includes(finalStr[i])) {
      numberOfVowels++;
    }
  }
  return numberOfVowels;
}
// console.log(countVowels("vinal"));
module.exports = countVowels;
