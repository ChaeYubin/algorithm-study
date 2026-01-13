// arr 배열에서 k개를 선택하는 모든 순열 생성
const getPermutations = (arr, k) => {
    const result = [];
    const visited = Array(arr.length).fill(false);
    
    const dfs = (combo) => {
        if (combo.length === k) {
            result.push(combo.join(''));
            return;
        }
        
        for (let i = 0; i < arr.length; i++) {
            if (visited[i]) continue;
            
            visited[i] = true;
            combo.push(arr[i]);
            dfs(combo);
            combo.pop();
            visited[i] = false;
        }
    }
    dfs([]);
    return result;
}

const simulateSubmit = (candidate, guess) => {
    let ball = 0;
    let strike = 0;
    
    for (let i = 0; i < 4; i++) {
        if (candidate[i] === guess[i]) {
            strike++;
        } else if (candidate.includes(guess[i])) {
            ball++;
        }
    }
    
    return `${strike}S ${ball}B`;
}

function solution(n, submit) {
    const number = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const allCandidates = getPermutations(number, 4); // 전체 순열 보관
    let candidates = [...allCandidates];
    
    while (candidates.length > 1) {
        const num = Number(candidates[0]);
        const clue = submit(num);
        
        // candidate가 실제 정답이라고 가정했을 때, num을 제출하면 현재 submit에서 받은 결과와 같아야 함
        candidates = candidates.filter(candidate => clue === simulateSubmit(candidate, String(num)));
    }

    return Number(candidates[0]);   
}