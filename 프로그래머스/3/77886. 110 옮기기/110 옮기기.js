function solution(s) {
    const answer = [];

    for (let str of s) {
        const stack = [];
        let count = 0; // '110'의 개수를 카운트

        // 스택을 사용해 '110'을 제거
        for (let char of str) {
            stack.push(char);
            if (stack.length >= 3 && stack.slice(-3).join('') === '110') {
                stack.pop(); // '0'
                stack.pop(); // '1'
                stack.pop(); // '1'
                count++; // '110' 카운트 증가
            }
        }

        // 남아있는 스택을 문자열로 변환
        let result = stack.join('');

        // '110'을 삽입할 위치를 결정
        const zeroIndex = result.lastIndexOf('0');
        if (zeroIndex === -1) {
            // '0'이 없다면 문자열 맨 앞에 삽입
            result = '110'.repeat(count) + result;
        } else {
            // 마지막 '0' 뒤에 삽입
            result = result.slice(0, zeroIndex + 1) + '110'.repeat(count) + result.slice(zeroIndex + 1);
        }

        answer.push(result);
    }

    return answer;
}
