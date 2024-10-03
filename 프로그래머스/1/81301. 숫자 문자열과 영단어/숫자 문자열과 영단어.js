function solution(s) {
    const alphabet = {
        'zero': 0,
        'one': 1,
        'two': 2,
        'three': 3,
        'four': 4,
        'five': 5,
        'six': 6,
        'seven': 7,
        'eight': 8,
        'nine': 9,
    }
    
    let answer = s;
    
    while (true) {
        if (answer.match(/[a-zA-Z]/g) === null) {
            break;
        }
        
        for (const a in alphabet) {
            answer = answer.replace(a, alphabet[a]);
        }
    }
    
    return Number(answer);
}