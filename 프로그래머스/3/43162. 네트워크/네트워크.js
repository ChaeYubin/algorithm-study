function dfs(computers, visited, node) {
    if (visited[node]) {
        return 0;  // 이미 방문했다면 새 네트워크가 아님
    }
    
    visited[node] = true; // 현재 노드 방문 처리
    
    for (let i = 0; i < computers[node].length; i++) {
        if (computers[node][i] && !visited[i]) {
            dfs(computers, visited, i);
        }
    }
    
    return 1;
}

function solution(n, computers) {
    let visited = Array(n).fill(false);
    
    let answer = 0;
    
    for (let i = 0; i < n; i += 1) {
        answer += dfs(computers, visited, i);
    }
    
    return answer;
}