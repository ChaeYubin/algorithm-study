/**
 * @param {number[][]} isConnected
 * @return {number}
 */
const findCircleNum = function (isConnected) {
    const n = isConnected.length;
    const visited = Array(n).fill(false);
    let answer = 0;

    for (let i = 0; i < n; i += 1) {
        if (!visited[i]) {
            answer += 1;
            DFS(i, isConnected, visited)
        }
    }

    return answer;
};

const DFS = function (node, isConnected, visited) {
    visited[node] = true;

    for (let i = 0; i < isConnected.length; i += 1) {
        if (isConnected[node][i] === 1 && !visited[i]) {
            DFS(i, isConnected, visited);
        }
    }
}
