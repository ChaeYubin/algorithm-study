// P 기준으로 상하좌우에 파티션이 있으면 그 사람은 안전하다.
// 만약 상하좌우에 사람이 있다면 바로 0 리턴
// 만약 상하좌우에 빈 테이블이 있고, 그 테이블 주변에 사람이 2명 이상이라면 0 리턴

// (x, y) 상하좌우에 사람이 몇 명 있는지 확인한다.
function nearPersonCount(places, x, y) {
    let count = 0;
    
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    for (let i = 0; i < 4; i += 1) {
        const nx = x + dx[i];
        const ny = y + dy[i];
        
        if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5 || places[nx][ny] === 'X') {
            continue;
        }
        
        if (places[nx][ny] === 'P') {
            count += 1;
        }
    }
    
    return count;
}

function solution(places) {
    var answer = [];
    
    const testCase = places.map(tc => tc.map(row => row.split("")));
    
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    for (let tc of testCase) {
        let stopFlag = false;
        
        for (let i = 0; i < 5; i += 1) {
            for (let j = 0; j < 5; j += 1) {
                if (tc[i][j] === 'P') {
                    // 상하좌우 확인
                    for (let d = 0; d < 4; d += 1) {
                        const nx = i + dx[d];
                        const ny = j + dy[d];

                        if (nx < 0 || nx >= 5 || ny < 0 || ny >= 5 || tc[nx][ny] === 'X') {
                            continue;
                        }

                        // 주변에 테이블이 있으면 테이블 주변에 사람이 있는지 한번 더 확인해봐야 한다.
                        if (tc[nx][ny] === 'O') {
                            if (nearPersonCount(tc, nx, ny) !== 1) {
                                stopFlag = true;
                            }
                        } else if (tc[nx][ny] === 'P') {
                            stopFlag = true;
                        }
                        
                        if (stopFlag) break;
                    }
                }
                if (stopFlag) break;
            }
            if (stopFlag) break;
        }
        if (stopFlag) answer.push(0);
        else answer.push(1);
    }
    
    return answer;
  
}