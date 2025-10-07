function solution(users, emoticons) {
    let maxSubscriber = 0;
    let maxSum = 0;
    
    const discount = [10, 20, 30, 40];
    
    const dfs = (disArr) => {
        if (disArr.length === emoticons.length) {
            let subscriber = 0;
            let sum = 0;
            
            for (user of users) {
                let s = 0;
                for (let i = 0; i < disArr.length; i += 1) {
                    if (disArr[i] >= user[0]) s += emoticons[i] * ((100 - disArr[i]) / 100);
                }
                
                if (s >= user[1]) {
                    subscriber += 1;
                } else {
                    sum += s;
                }
            }
            
            if (subscriber > maxSubscriber) {
                maxSubscriber = subscriber;
                maxSum = sum;
            } else if (subscriber === maxSubscriber && sum > maxSum) {
                maxSum = sum;
            }
                
        } else {
            for (let i = 0; i < 4; i += 1) {
                dfs([...disArr, discount[i]]);
            }
        }
    }
    
    dfs([]);
    
    return [maxSubscriber, maxSum];
}