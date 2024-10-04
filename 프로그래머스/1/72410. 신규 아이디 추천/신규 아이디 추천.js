function solution(new_id) {
    let newId = new_id;
    
    
    newId = newId.toLowerCase(); // 1단계
    newId = newId.replace(/[^a-z0-9-_.]/g, ''); // 2단계
    newId = newId.replace(/\.{2,}/g, '.'); // 3단계
    newId = newId.replace(/^\.|\.$/g, ''); // 4단계
    
    // 5단계
    if (newId === '') {
        newId = 'a';
    }

    // 6단계
    newId = newId.slice(0, 15);  
    newId = newId.replace(/\.$/, '');  

    // 7단계
    while (newId.length <= 2) {
        newId += newId[newId.length - 1];
    }
    
    return newId;
}