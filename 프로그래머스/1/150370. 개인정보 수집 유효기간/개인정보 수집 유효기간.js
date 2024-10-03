function solution(today, terms, privacies) {
    const answer = [];
    
    // 1달 = 28일, 1년 = 28 * 12;
    const M = 28;
    const Y = 28 * 12;
    
    const [year, month, day] = today.split(".").map(Number);
    const todayValue = (year - 2000) * Y + month * M + day;
    
    const termValue = terms.map((v) => {
        const [term, period] = v.split(" ");
        return { term: term, period: Number(period) * M };
    });
    
    for (let i = 0; i < privacies.length; i += 1) {
        const [date, term] = privacies[i].split(" ");
        const [year, month, day] = date.split(".").map(Number);
        const dateValue = (year - 2000) * Y + month * M + day;
        const expDate = dateValue + termValue.find(v => v.term === term).period - 1;
        
        if (todayValue > expDate) {
            answer.push(i + 1);
        }
    }

    return answer;
}