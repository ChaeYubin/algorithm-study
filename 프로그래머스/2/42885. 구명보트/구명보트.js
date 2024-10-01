function solution(people, limit) {
    let answer = 0;
    let sortedPeople = people.sort((a, b) => a - b);

    let lt = 0;
    let rt = sortedPeople.length - 1;
    
    while (lt <= rt) {
        if (sortedPeople[lt] + sortedPeople[rt] <= limit) {
            lt += 1;
            rt -= 1;
        } else {
            rt -= 1;
        }
        answer += 1;
    }
    
    return answer;
}