/**
 * @param {number} n
 * @return {number[]}
 */
const lexicalOrder = function(n) {
    const arr = Array.from({ length: n }, (n, i) =>  i + 1).map(n => n.toString());
    const sortedArr = arr.sort();
    return sortedArr.map(Number);
};