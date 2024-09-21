/**
 * @param {number[][]} isConnected
 * @return {number}
 */
const findCircleNum = function(isConnected) {
    const n = isConnected.length;
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    let answer = 0;

    for (let i = 0; i < n; i += 1) {
        for (let j = 0; j < n; j += 1) {
            if (isConnected[i][j] === 1 && !visited[i][j]) {
                answer += 1;
                visited[i][j] = true;

                BFS(isConnected, visited, n, i, j);
            }
        }
    }

    return answer;
};

function BFS(isConnected, visited, n, x, y) {
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];

    const queue = [[x, y]];

    while (queue.length) {
        const [x, y] = queue.shift();

        for (let i = 0; i < 4; i+= 1) {
            const nx = x + dx[i];
            const ny = y + dy[i];

            if (nx < 0 || nx >= n ||  ny < 0 || ny >= n || visited[nx][ny] || isConnected[nx][ny] === 0) continue;

            visited[nx][ny] = true;
            queue.push([nx, ny]);
        }
    }
}