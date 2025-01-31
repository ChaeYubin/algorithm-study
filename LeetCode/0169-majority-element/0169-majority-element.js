/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function(nums) {
    const obj = {};

    for (let num of nums) {
        if (!obj[num]) {
            obj[num] = 0;
        } 
        
        obj[num] += 1;
    }

    const objKeyArray = Object.keys(obj);

    const sortedArray = objKeyArray.sort((a, b) => obj[b] - obj[a]);

    return Number(sortedArray[0]);
};