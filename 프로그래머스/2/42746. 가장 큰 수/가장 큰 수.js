function solution(numbers) {
    const result = numbers.map(n => n.toString()).sort((a, b) => {
        if (a + b > b + a) return -1;
        if (a + b < b + a) return 1;
    }).join('');
    
    return result.startsWith('0') ? '0' : result;
}