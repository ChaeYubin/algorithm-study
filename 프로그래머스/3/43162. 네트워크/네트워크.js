function dfs(computers, visited, node) {
    visited[node] = true; // 현재 노드 방문 처리
    
    for (let i = 0; i < computers[node].length; i++) {
        if (computers[node][i] && !visited[i]) {
            dfs(computers, visited, i);
        }
    }
}

function solution(n, computers) {
    let visited = Array(n).fill(false);
    
    let answer = 0;
    
    for (let i = 0; i < n; i += 1) {
        if (!visited[i]) {
            dfs(computers, visited, i);
            answer += 1;
        }
    }
    
    return answer;
}