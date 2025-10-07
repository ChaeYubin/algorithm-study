function solution(phone_book) {
    const sort = phone_book.sort();
    
    for (let i = 0; i < phone_book.length - 1; i++) {
        if (sort[i + 1].startsWith(sort[i])) {
            return false;
        }
    }
    
    return true;
}