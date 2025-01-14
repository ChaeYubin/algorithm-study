function match(id, pattern) {
    pattern = pattern.replaceAll('*', '.');
    const regex = RegExp('\^(' + pattern + ')$');
    return regex.test(id);
}

function solution(user_id, banned_id) {
    const arr = [];
    
    for (let bannedId of banned_id) {
        // arr에 banned_id에 해당하는 userId들을 차례로 추가
        arr.push(user_id.filter((userId) => match(userId, bannedId)));
    }
    
    const set = new Set();
    
    const visited = {}; // visited를 객체 형태로 사용
    user_id.forEach((id) => visited[id] = 0);
    
    // dfs로 모든 조합 탐색
    const dfs = (count, array) => {
        if (count === banned_id.length) {
            set.add(array.sort().join(','));
            return;
        }
        
        for (let i = 0; i < arr[count].length; i++) {
            if (visited[arr[count][i]] === 0) {
                visited[arr[count][i]] = 1;
                dfs(count + 1, [...array, [arr[count][i]]]);
                visited[[arr[count][i]]] = 0;
            }
        }
    }
    
    dfs(0, []);
    
    return set.size;
}