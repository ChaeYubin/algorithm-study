function solution(players, m, k) {
    let server = Array(24).fill(0);  // 각 시간대마다 추가로 운영되는 서버의 수 
    let answer = 0;  // 서버 증설 횟수
    
    for (let i = 0; i < 24; i++) {
        // 서버 증설이 필요한 경우
        if (server[i] < Math.floor(players[i] / m)) {
            // 서버 증설
            const expandServerCount = Math.floor(players[i] / m) - server[i]
            answer += expandServerCount;
            
            for (let j = 0; j < k; j++) {
                if (i + j > 23) break;
                server[i + j] += expandServerCount;
            }
        }
    }
    
    return answer;
}