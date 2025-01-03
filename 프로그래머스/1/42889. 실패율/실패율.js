function solution(N, stages) {
    // 스테이지 별 도전자 수 구하기(특정 단계에 머물러 있다 = 실패)
    const challenger = new Array(N + 2).fill(0);
    for (const stage of stages) {
        challenger[stage] += 1;
    }
    
    // 실패한 사용자 수 계산
    const fails = {};
    let total = stages.length;
    
    // 각 스테이지를 순회하며, 실패율 계산
    for (let i = 1; i <= N; i++) {
        // 도전한 사람이 없는 경우, 실패율은 0
        if (challenger[i] === 0) {
            fails[i] = 0;
            continue;
        }
        
        // 실패율 계산
        fails[i] = challenger[i] / total;
        
        // 다음 스테이지의 실패율을 구하기 위해 현재 스테이지의 인원을 뺌
        total -= challenger[i];
    }
    
    // 실패율이 높은 스테이지부터 내림차순으로 정렬
    const result = Object.entries(fails).sort((a, b) => b[1] - a[1]);
    
    return result.map((v) => Number(v[0]));
}