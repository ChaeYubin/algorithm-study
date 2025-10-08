function solution(numbers, target) {
    const dfs = (curIndex, sum) => {
        if (curIndex === numbers.length) {
            if (sum === target) {
                return 1;
            }
            
            return 0;
        }
        
        const sum1 = dfs(curIndex + 1, sum + numbers[curIndex]);
        const sum2 = dfs(curIndex + 1, sum - numbers[curIndex]);
        
        return sum1 + sum2;
    }
    
    return dfs(0, 0);
}