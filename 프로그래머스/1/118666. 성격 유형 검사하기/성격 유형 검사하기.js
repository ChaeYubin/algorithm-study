function solution(survey, choices) {
    const answer = [];
    
    const metrics = [['R', 'T'], ['C', 'F'], ['J', 'M'], ['A', 'N']]
    const choiceScore = [0, 3, 2, 1, 0, 1, 2, 3];
    
    let score = {'R': 0, 'T': 0, 'C': 0, 'F': 0, 'J': 0, 'M': 0, 'A': 0, 'N': 0};
    
    for (let i = 0; i < survey.length; i += 1) {
        const [notAgree, agree] = survey[i].split("");
        
        if (choices[i] < 4) {
            score[notAgree] += choiceScore[choices[i]];
        } else {
            score[agree] += choiceScore[choices[i]];
        }
    }
    
    for (let i = 0; i < 4; i += 1) {
        if (score[metrics[i][0]] >= score[metrics[i][1]]) {
            answer.push(metrics[i][0]);
        } else {
            answer.push(metrics[i][1]);
        }
    }
    
    return answer.join("");
}