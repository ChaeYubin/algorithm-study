/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    let buy = Infinity;  // 최소 가격
    let answer = 0;  // 최대 이익

    for (let price of prices) {
        if (price < buy) {
            buy = price; // 최저가 갱신
        } else {
            answer = Math.max(answer, price - buy);  // 최대 이익 갱신
        }
    }

    return answer;
};