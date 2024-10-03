// Map => [들어오는 간선의 개수, 나간 선의 개수]
const getInfo = (edges) => {
    const info = edges.reduce((map, key) => {
        const [start, end] = key;
        if (!map.has(start)) {
            map.set(start, [0, 1]);
        } else {
            const [into, out] = map.get(start);
            map.set(start, [into, out + 1]);
        }
            
        if (!map.has(end)) {
            map.set(end, [1, 0]);
        } else {
            const [into, out] = map.get(end);
            map.set(end, [into + 1, out]);
        }
        
        return map;
    }, new Map());
    
    return info;
}

const checkInfo = (info) => {
    const res = new Array(4).fill(0);
    
    for (const [key, io] of info) {
        const [into, out] = io;
        
        if (into === 0 && out >= 2) {
            // 들어오는 간선이 없고, 나가는 간선이 2개 이상이면 새롭게 생성한 정점이다.
            res[0] = key;
        } else if (out === 0) {
            // 나가는 간선이 없으면 막대그래프이다.
            res[2] += 1;
        } else if (out >= 2 && into >= 2) {
            // 나가는 간선이 2개 이상이고, 들어오는 간선도 2개 이상이면 8자 그래프의 중앙 정점이다.
            res[3] += 1;
        }
    }
    
    res[1] = info.get(res[0])[1] - res[2] - res[3];
    return res;
}
                              
const solution = (edges) => {
    const mapInfo = getInfo(edges);
    const answer = checkInfo(mapInfo);
    return answer;
}