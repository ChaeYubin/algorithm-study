function solution(n, times) {
    const sortedTimes = times.sort((a, b) => a - b);
    let left = 1;
    let right = times[times.length - 1] * n;
    let answer = right;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2); 
        let count = 0; 
        
        times.forEach((time) => {
            count += Math.floor(mid / time);  // mid분동안 각 심사관이 심사할 수 있는 사람 수
            
            if (count >= n) {
                // 심사해야 하는 사람 수 인 n 이상이면 answer 최솟값으로 갱신
                answer = Math.min(mid, answer);
                return;
            }
        });
        
        if (count >= n) {
            right = mid - 1;
        } else {
            left = mid + 1;
        }
    }
    
    return answer;
}