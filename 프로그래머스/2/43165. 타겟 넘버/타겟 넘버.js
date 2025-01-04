function solution(numbers, target) {
    let answer = 0;
    
    const dfs = (curIndex, sum) => {
        if (curIndex === numbers.length) {
            if (sum === target) {
                answer++;
            }
            
            return;
        }
        
        dfs(curIndex + 1, sum + numbers[curIndex]);
        dfs(curIndex + 1, sum - numbers[curIndex]);
    }
    
    dfs(0, 0);
    
    return answer;
}