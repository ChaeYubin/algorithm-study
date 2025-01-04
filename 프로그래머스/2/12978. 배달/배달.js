function solution(N, road, K) {
    const graph = Array.from({length: N + 1}, () => []);
    const dist = Array(N + 1).fill(Infinity);
    
    road.forEach(([start, end, cost]) => {
        graph[start].push({to: end, dist: cost});
        graph[end].push({to: start, dist: cost});
    });
    
    const queue = [{to: 1, dist: 0}];
    dist[1] = 0;
    
    while (queue.length) {
        const { to } = queue.pop();
        
        graph[to].forEach((next) => {
            if (dist[next.to] > dist[to] + next.dist) {
                dist[next.to] = dist[to] + next.dist;
                queue.push(next);
            }
        })
    }
    
    return dist.filter((v) => v <= K).length;
}