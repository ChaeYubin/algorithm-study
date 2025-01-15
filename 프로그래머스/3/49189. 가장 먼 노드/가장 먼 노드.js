function solution(n, edge) {
    const adjList = {};
    // 양방향 그래프 생성
    edge.forEach(([s, e]) => {
        if (!adjList[s]) adjList[s] = [];
        if (!adjList[e]) adjList[e] = [];
        
        adjList[s].push(e);
        adjList[e].push(s);
    });
    
    // 다익스트라로 각 정점까지의 최단 경로 길이 찾기
    let dis = Array(n + 1).fill(Infinity);  // 1번부터 n번까지의 최단 경로의 거리를 저장할 배열
    
    const queue = [1];
    dis[1] = 0;
    
    while (queue.length) {
        const curNode = queue.shift();
        
        for (let nextNode of adjList[curNode]) {
            if (dis[nextNode] > dis[curNode] + 1) {
                dis[nextNode] = dis[curNode] + 1;
                queue.push(nextNode);
            }
        }
    }
    
    // 길이가 같은 노드의 개수를 세서 리턴
    const maxValue = Math.max(...dis.filter(v => v !== Infinity));
    return dis.filter(v => v === maxValue).length;
}