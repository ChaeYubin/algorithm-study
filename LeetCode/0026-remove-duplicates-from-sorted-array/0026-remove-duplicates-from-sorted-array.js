/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    let pointer = 1;

    for (let i = 0; i < nums.length; i++) {
        while (nums[i] === nums[pointer]) {
            pointer++;
        } 

        nums.splice(i + 1, pointer - i - 1);
        pointer = i + 1;
    }
};