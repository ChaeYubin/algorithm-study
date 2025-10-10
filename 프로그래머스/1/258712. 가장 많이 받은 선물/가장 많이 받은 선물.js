function solution(friends, gifts) {
    // giftTable[i][j] = i가 j에게 준 선물의 개수
    const giftTable = Array.from({length: friends.length}, () => Array.from({length: friends.length}, () => 0));
    
    // 선물 지수
    const giftScore = Array(friends.length).fill(0);
    
    gifts.forEach(str => {
        const [giver, taker] = str.split(" ");
        
        const giverIndex = friends.indexOf(giver);
        const takerIndex = friends.indexOf(taker);
        
        giftTable[giverIndex][takerIndex] += 1;
        giftScore[giverIndex] += 1;  // 선물 지수 증가
        giftScore[takerIndex] -= 1;  // 선물 지수 감소
    })
    
    let answer = 0;
    
    const nextGifts = Array(friends.length).fill(0);
    
    for (let i = 0; i < friends.length; i += 1) {
        for (let j  = i + 1; j < friends.length; j += 1) {
            if (giftTable[i][j] !== giftTable[j][i]) {
                const bigger = giftTable[i][j] > giftTable[j][i] ? i : j;
                nextGifts[bigger] += 1;
            } else {
                if (giftScore[i] === giftScore[j]) {  
                    continue;
                } else {
                    const bigger = giftScore[i] > giftScore[j] ? i : j;
                    nextGifts[bigger] += 1;
                }
            }
        }
    }
    
    return Math.max(...nextGifts);
}