// 카펫 가로 길이 >= 세로 길이
// 노란색의 가로/세로 길이를 정하고, 그를 둘러싸는 개수가 주어진 게 맞는지 확인한다.
// 노랑 가로 = a, 노랑 세로 = b ( a >= b )
// 갈색 가로 = c = a + 2, 갈색 세로 = d = b + 2
// 갈색 개수 구하기 = 가로 * 2 + 세로 * 2 - 4
// 노랑을 a * b 형태로 나눠야 한다.

function solution(brown, yellow) {
    let index = 1;
    
    if (yellow === 1) {
        return [3, 3];
    }
    
    while (index <= yellow / 2) {
        if (yellow % index !== 0) {
            index += 1; 
            continue;
        }
        
        const [height, width] = [index, yellow / index];
        
        if ((width + 2) * 2 + (height + 2) * 2 - 4 === brown) {
            return [width + 2, height + 2];
        } 
        
        index += 1;
    }
}