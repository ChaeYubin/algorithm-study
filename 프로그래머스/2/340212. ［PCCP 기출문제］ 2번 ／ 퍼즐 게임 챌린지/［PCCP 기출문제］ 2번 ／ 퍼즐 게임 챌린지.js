function solution(diffs, times, limit) {
    let left = 1;
    let right = diffs.reduce((acc, cur) => Math.max(acc, cur), 1);
    
    const isSolved = (level) => {
        let totalTime = 0;
        
        for (let i = 0; i < diffs.length; i++) {
            const curTime = times[i];
            const prevTime = times[i - 1] || 0;
            
            if (diffs[i] <= level) totalTime += curTime;
            else totalTime += (diffs[i] - level) * (curTime + prevTime) + curTime;
        }
    
        return totalTime > limit ? false : true;
    }
    
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (isSolved(mid)) right = mid - 1;
        else left = mid + 1;
    }
    
    return left;
}