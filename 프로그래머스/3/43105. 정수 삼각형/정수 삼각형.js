function solution(triangle) {
    // let dp = Array.from({ length: triangle.length }, (_, i) => Array.from({ length: i + 1 }, () => 0));
    // 위처럼 하지 않고 1차원 배열 하나만 사용해서 공간복잡도를 낮출 수 있다.
    
    let prev = triangle[0]; // 첫 번째 행으로 초기화
    
    for (let i = 1; i < triangle.length; i += 1) {
        const current = Array(i + 1).fill(0); // 현재 행을 위한 배열
        
        for (let j = 0; j < triangle[i].length; j += 1) {
            if (j === 0) {
                current[j] = prev[j] + triangle[i][j]; // 첫 번째 원소
            } else if (j === i) {
                current[j] = prev[j-1] + triangle[i][j]; // 마지막 원소
            } else {
                current[j] = Math.max(prev[j-1] , prev[j]) + triangle[i][j];
            }
        }
        
        prev = current; // 현재 행을 이전 행으로 업데이트
    }
    
    return Math.max(...prev);
}