function solution(land) {
    const n = land.length;
    const m = land[0].length; 
    
    const visited = Array.from({ length: n }, () => Array(m).fill(false));
    const columnSum = Array(m).fill(0);  // 각 열에 대해 시추가 가능한 총 석유량
    
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    
    const bfs = (x, y) => {
        const queue = [[x, y]]
        visited[x][y] = true;

        let size = 1;
        const columns = new Set([y]);
        
        let idx = 0;

        while (idx < queue.length) {
            const [cx, cy] = queue.shift();

            for (let i = 0; i < 4; i++) {
                const nx = cx + dx[i];
                const ny = cy + dy[i];

                if (nx < 0 || nx >= n || ny < 0 || ny >= m || visited[nx][ny] || land[nx][ny] === 0) continue;

                visited[nx][ny] = true;
                queue.push([nx, ny]);
                
                size++;
                columns.add(ny);
            }
        }
        
        return { size, columns };
    }
    
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            // 빈 땅이거나 이미 방문한 경우 skip
            if (land[i][j] === 0 || visited[i][j]) continue;

            const { size, columns } = bfs(i, j);

            for (const col of columns) {
               columnSum[col] += size;
            }
        }
    }
            
    return Math.max(...columnSum);
}