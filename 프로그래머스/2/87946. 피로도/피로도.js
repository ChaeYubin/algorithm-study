function dfs(fatigue, cnt, dungeons, visited) {
    let max = cnt;

    for (let i = 0; i < dungeons.length; i++) {
        if (!visited[i] && dungeons[i][0] <= fatigue) {
            visited[i] = true;
            max = Math.max(max, dfs(fatigue - dungeons[i][1], cnt + 1, dungeons, visited));
            visited[i] = false;
        } 
    }
    
    return max;
}

function solution(k, dungeons) {
    const visited = Array(dungeons.length).fill(false);
    const answer = dfs(k, 0, dungeons, visited);
    
    return answer;
}