function solution(participant, completion) {
    const map = new Map();
    
    participant.forEach((p) => {
        map.set(p, (map.get(p) || 0) + 1);
    })
    
    completion.forEach((c) => {
        map.set(c, map.get(c) - 1);
    })
    
    for (let [key, num] of Array.from(map)) {
        if (num === 1) return key;
    }
}