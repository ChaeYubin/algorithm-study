/**
 * @param {number[]} citations
 * @return {number}
 */
var hIndex = function(citations) {
    const length = citations.length;

    const sortedCitations = citations.sort((a, b) => a - b);

    for (let i = 0; i < length; i++) {
        if (sortedCitations[i] >= length - i) {
            return (length - i);
        }
    }

    return 0;
};