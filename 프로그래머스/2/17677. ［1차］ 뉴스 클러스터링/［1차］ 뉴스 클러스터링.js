function solution(str1, str2) {
    const exec = (str) => {
        const result = [];
        
        for (let i = 0; i < str.length - 1; i += 1) {
            const element = str.slice(i, i + 2);
            if (element.match(/[^a-zA-Z]/)) continue;
            result.push(element.toUpperCase());
        }
        
        return result;
    }
    
    const arr1 = exec(str1);
    const arr2 = exec(str2);
    
    const set = new Set([...arr1, ...arr2]);
    
    let unionSize = 0;
    let intersectionSize = 0;
    
    //같은 원소를 검사해서 많은  쪽은 union에 더하고 적은쪽은 intersection에 더한다.
    set.forEach(item => {
        const has1 = arr1.filter(x => x === item).length;
        const has2 = arr2.filter(x => x === item).length;
        unionSize += Math.max(has1, has2);
        intersectionSize += Math.min(has1, has2);
    })
    
    return unionSize === 0 ? 65536 : Math.floor(intersectionSize / unionSize * 65536);
}