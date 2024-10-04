// 여벌 체육복을 가져온 학생이 도난당했다면 자신이 입어야 하기에 다른 학생에게 빌려줄 수 없다.
// 남는걸 가져온 학생이 최대한 도난당한 학생에게 빌려줘야 한다.
// 바로 앞번호 or 뒷번호의 학생에게만 체육복을 빌려줄 수 있다.
// 만약 lost reserve 두 배열에 모두 있는 학생이라면 제외해야 한다. -> 처음부터 완전탐색을 하면 어렵겠지?
// 여벌이 있는 학생의 앞/뒷번호를 확인해서 줄 수 있으면 무조건 준다. (본인 -> 삭제)

function solution(n, lost, reserve) {
    const sortedLost = lost.sort((a, b) => a - b);
    const sortedReserve = reserve.sort((a, b) => a - b);
    
    // 1. 여벌 체육복을 가진 학생이 도난당한 경우 먼저 처리 (교차 제거)
    let actualLost = sortedLost.filter(l => !sortedReserve.includes(l));
    let actualReserve = sortedReserve.filter(r => !sortedLost.includes(r));

    // 2. 여벌 체육복 빌려주기
    for (r of actualReserve) {
        if (actualLost.indexOf(r - 1) !== -1) {
            actualLost.splice(actualLost.indexOf(r - 1), 1); // 앞 학생에게 빌려줌
        } else if (actualLost.indexOf(r + 1) !== -1) {
            actualLost.splice(actualLost.indexOf(r + 1), 1); // 뒷 학생에게 빌려줌
        }
    }

    // 전체 학생 수에서 체육복을 잃어버려서 못 입는 학생 수를 뺀 값을 반환
    return n - actualLost.length;
}