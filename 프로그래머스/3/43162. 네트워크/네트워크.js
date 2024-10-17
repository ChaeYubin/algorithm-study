function solution(n, computers) {
    let visited = Array(n).fill(false);
    
    let network = 0;
    // BFS로 탐색 -> 방문하지 않았던 지점을 시작으로 연결되어 있는 만큼 계속 돈다.
    
    const bfs = (index) => {
        const queue = [index];
        
        while (queue.length) {
            const curIndex = queue.shift();
            visited[curIndex] = true;
            
            for (let i = 0; i < n; i += 1) {
                if (i === curIndex) continue;
                
                if (computers[curIndex][i] && !visited[i]) {
                    queue.push(i);
                }
            }
        }
    }
    
    for (let i = 0; i < n; i += 1) {
        if (!visited[i]) {
            network += 1;
            bfs(i);
        }
    }
    
    return network;
}