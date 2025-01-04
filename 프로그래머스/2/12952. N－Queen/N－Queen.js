// n: 체스판의 크기
// y: 현재 퀸을 놓을 위치(= 현재 위치가 결정된 퀸의 개수)
// width[i]: 특정 열에 퀸이 위치했는지 표시
// diagonal1: 오른쪽 위 -> 왼쪽 아래 대각선 방향 퀸 중복 체크용 배열
// diagonal2: 왼쪽 위 -> 오른쪽 아래 대각선 방향 퀸 중복 체크용 배열
function search(n, y, width, diagonal1, diagonal2) {
    let answer = 0;
    
    if (y === n) {
        answer += 1;
    } else {
        // 현재 행에서 퀸이 놓일 수 있는 모든 위치를 시도
        for (let i = 0; i < n; i++) {
            if (width[i] || diagonal1[i + y] || diagonal2[i - y + n]) {
                continue;
            }
            
            width[i] = diagonal1[i + y] = diagonal2[i - y + n] = true;
            
            answer += search(n, y + 1, width, diagonal1, diagonal2);
            
            width[i] = diagonal1[i + y] = diagonal2[i - y + n] = false;
        }
    }
    
    return answer;
}

function solution(n) {
    const answer = search(n, 0, Array(n).fill(false), Array(n * 2).fill(false), Array(n * 2).fill(false));
    
    return answer;
}