/*
배달해야 하는 택배 박스의 개수 = 수거해야 하는 택배 박스의 개수
배달/수거 택배 박스의 개수는 최소 0개, 최대 50개
물류창고에서 가장 먼 집까지 최소한으로 왔다갔다 해야한다... 
끝에서 끝까지 왔다갔다 한다 -> 가장 먼 집부터 해결한다?

[배달 방향(->)] 
끝 집부터 가까운 집 순으로 최대 택배량을 싣는다.
= 끝 집부터 최대한 배달한 것과 같다.
[수거 방향(<-)]
끝 집부터 가까운 집 순으로 최대 수거량을 채운다.
*/
function solution(cap, n, deliveries, pickups) {
    const d = deliveries;
    const p = pickups;
    
    let remainD = d.reduce((acc, cur) => acc + cur, 0);  // 남은 배달 박스의 총합
    let remainP = p.reduce((acc, cur) => acc + cur, 0);  // 남은 수거 박스의 총합
    
    let answer = 0;
    
    let farthestHouse = n - 1;
    
    while (true) {
        // 가장 먼 집을 먼저 갱신하는 이유는, 맨 처음에도 [0, 0]이 주어질 수 있기 때문이다.
        // 배달과 수거가 모두 끝난 가장 먼 집을 갱신
        while (farthestHouse >= 0 && d[farthestHouse] === 0 && p[farthestHouse] === 0) {
            farthestHouse -= 1;  // 다음으로 먼 집을 찾음
        }
        
        // 모든 집의 배달과 수거가 끝났다면 반복문 종료
        if (farthestHouse < 0) {
            break;
        }
        
        // 택배에 박스를 싣고 배달한다. -> 가장 먼 집부터 가까운 집 순으로 최대 cap 만큼 배달할 수 있다.
        let boxCount = cap;
        for (let i = farthestHouse; i >= 0; i -= 1) {
            if (remainD === 0) break;
            
            if (d[i] <= boxCount) {
                boxCount -= d[i];
                remainD -= d[i];
                d[i] = 0;
            } else {
                d[i] -= boxCount;
                remainD -= boxCount;
                boxCount = 0;
                break;  // 배달할 수 있는 택배가 없으므로 for문을 탈출한다.
            }
        }
        
        // 박스를 수거한다.
        let remainCount = cap;
        for (let i = farthestHouse; i >= 0; i -= 1) {
            if (remainP === 0) break;
            
            if (p[i] <= remainCount) {
                remainCount -= p[i];
                remainP -= p[i];
                p[i] = 0;
            } else {
                p[i] -= remainCount;
                remainP -= remainCount;
                remainCount = 0;
                break;  // 더이상 수거할 수 없으므로 for문을 탈출한다.
            }
        }
        
        answer += (farthestHouse + 1) * 2;  // 가장 먼 집까지 1번 왕복
    }
    
    return answer;
}