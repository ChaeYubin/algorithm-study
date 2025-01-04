function solution(clothes) {
    const map = new Map();
    
    clothes.forEach(([name, type]) => {
        map.set(type, (map.get(type) || []).concat(name));
    })
    
    let answer = 1;
    
    for (let val of map.values()) {
        answer *= (val.length + 1);
    }
    
    return answer - 1;
}