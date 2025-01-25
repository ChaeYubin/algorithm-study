/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function (nums1, m, nums2, n) {
    let pointer = 0;
    let nums1Length = m;

    for (let i = 0; i < n; i++) {
        nums1.pop();

        while (true) {
            if (pointer >=  nums1Length) break;

            if (nums1[pointer] <= nums2[i]) pointer++;
            else break;
        }

        nums1.splice(pointer, 0, nums2[i]);
        nums1Length++;
    }
};