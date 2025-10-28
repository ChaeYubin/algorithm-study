function solution(n, q, ans) {
    // ans 내림차순 정렬 후 인덱스 확인
    const sortedIndex = ans.map((v, i) => [v, i])
                           .sort((a, b) => b[0] - a[0])
                           .map(v => v[1]);

    const maxAnsIndex = sortedIndex[0];
    const maxQ = q[maxAnsIndex];
    
    // 조합 생성 함수
    const getCombinations = (arr, k) => {
        const result = [];
        const dfs = (start, combo) => {
            if (combo.length === k) {
                result.push([...combo]);
                return;
            }
            for (let i = start; i < arr.length; i++) {
                dfs(i + 1, [...combo, arr[i]]);
            }
        };
        dfs(0, []);
        return result;
    };
    
    const candidate1 = getCombinations(maxQ, ans[maxAnsIndex]);
    
    // 나머지 숫자에서 남은 개수 뽑기
    const remainingNumbers = Array.from({ length: n }, (_, i) => i + 1)
                                  .filter(x => !maxQ.includes(x));
    const candidate2 = getCombinations(remainingNumbers, 5 - ans[maxAnsIndex]);
    
    // 두 조합 합치기
    const candidate = [];
    for (let c1 of candidate1) {
        for (let c2 of candidate2) {
            candidate.push([...c1, ...c2]);
        }
    }

    // 필터링
    const getEqualCount = (arr1, arr2) => arr1.filter(v => arr2.includes(v)).length;
    
    let finalCandidates = candidate;
    for (let i = 0; i < ans.length; i++) {
        finalCandidates = finalCandidates.filter(c => getEqualCount(q[i], c) === ans[i]);
    }
    
    return finalCandidates.length;
}
