function solution(k, dungeons) {
    const N = dungeons.length
    const visited = new Array(N).fill(0)
    let ans = 0

    function dfs(k, cnt) {
        ans = Math.max(cnt, ans)

        for (let j = 0; j < N; j++){
            if (k >= dungeons[j][0] && !visited[j]){
                visited[j] = 1
                dfs(k - dungeons[j][1], cnt + 1)
                visited[j] = 0
            }
        }
    }

    dfs(k, 0)
    return ans;
}