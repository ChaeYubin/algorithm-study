// A가 가져갈 수 있는 주사위 조합 구하기
const getCombination = (arr, selectNum) => {
    let result = [];

    if (selectNum === 1) return arr.map(v => [v]);

    arr.forEach((fixed, idx, origin) => {
        const rest = origin.slice(idx + 1);
        const combinations = getCombination(rest, selectNum - 1);
        const attached = combinations.map((combi) => [fixed, ...combi]);
        result.push(...attached);
    })

    return result;
};

// A가 B를 몇 번 이길 수 있는지 계산 (이분탐색 이용)
const versus = (arr1, arr2) => {
    let result = 0;
    
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    
    for (let i = 0; i < arr1.length; i++) {
        let value = arr1[i];  
        
        let start = 0;
        let end = arr2.length - 1;
        
        // arr1에서 선택한 값(value)을 기준으로, arrr2에서 value보다 작은 값의 개수 찾기
        while (start <= end) {
            let index = parseInt((start + end) / 2);
            
            if (value <= arr2[index]) {
                end = index - 1;
            } else {
                start = index + 1;
            }
        }
        
        // start가 end보다 크게 될 때, start = arr2에서 value보다 작은 값의 개수
        result += start;
    }
    
    return result;
}

// 선택할 주사위 중 각각 하나의 수 선택하기
const selectNum = (combi) => {
    let result = [];

    const dfs = (level, sum) => {
        if (level === combi.length) {
            result.push(sum);
            return;
        } 

        for (let i = 0; i < 6; i++) {
            dfs(level + 1, sum + combi[level][i]);
        }
    }

    dfs(0, 0);
    return result;
}
    
function solution(dice) {
    const n = dice.length;
    const arr = Array.from({ length: n }, (_, i) => i);
    const aCombinations = getCombination(arr, n / 2);
    const bCombinations = aCombinations.map((combi) => arr.filter(a => !combi.includes(a)));
    
    let max = 0;
    let answer = [];
    
    for (let i = 0; i < aCombinations.length; i++) {
        const aDices = aCombinations[i].map(el => dice[el]);
        const bDices = bCombinations[i].map(el => dice[el]);
        
        const aSums = selectNum(aDices);  // 각 주사위를 굴려 만들 수 있는 모든 합
        const bSums = selectNum(bDices);
        
        const temp = versus(aSums, bSums);
        
        if (temp > max) {
            max = temp;
            answer = aCombinations[i];
        }
    }
    
    return answer.map(v => v + 1);
}