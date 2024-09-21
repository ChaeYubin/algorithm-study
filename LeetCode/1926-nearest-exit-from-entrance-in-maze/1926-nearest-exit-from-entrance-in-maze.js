/**
 * @param {character[][]} maze
 * @param {number[]} entrance
 * @return {number}
 */
const nearestExit = function (maze, entrance) {
    const m = maze.length;
    const n = maze[0].length;

    const dis = BFS(m, n, maze, entrance[0], entrance[1]);

    return dis;
};

const BFS = function (m, n, maze, x, y) {
    let dis = 0;
    const queue = [[x, y]];

    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];

    maze[x][y] = '+';  // 시작점 방문 처리

    while (queue.length) {
        const len = queue.length;
        dis += 1;
        
        for (let i = 0; i < len; i += 1) {
            const [x, y] = queue.shift();

            for (let j = 0; j < 4; j += 1) {
                const nx = x + dx[j];
                const ny = y + dy[j];

                // 범위를 벗어나거나 벽인 경우 continue
                if (nx < 0 || nx >= m || ny < 0 || ny >= n || maze[nx][ny] === '+') continue;

                // 가장자리에 도달한 경우 -> 출구를 찾음
                if (nx === 0 || nx === m - 1 || ny === 0 || ny === n - 1) {
                    return dis;
                }

                // 다음 위치로 이동
                maze[nx][ny] = '+';  // 방문 처리
                queue.push([nx, ny]);
            }
        }
    }

    return -1;
}
