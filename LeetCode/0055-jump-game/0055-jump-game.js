/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function(nums) {
    const dp = Array(nums.length).fill(false);  // dp[i] = i에 갈 수 있는지 여부
    dp[0] = true;

    if (nums.length === 1) return true;

    for (let i = 0; i < nums.length; i++) {
        if (!dp[i]) continue;

        for (let j = 1; j <= nums[i]; j++) {
            if (i + j === nums.length - 1) return true;
            
            dp[i + j] = true;
        }
    }

    return false;
};