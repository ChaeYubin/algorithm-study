/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    let buy = Infinity;
    let answer = 0;

    for (let price of prices) {
        if (price < buy) {
            buy = price;
        } else {
            answer += price - buy;
            buy = price;
        }
    }

    return answer;
};