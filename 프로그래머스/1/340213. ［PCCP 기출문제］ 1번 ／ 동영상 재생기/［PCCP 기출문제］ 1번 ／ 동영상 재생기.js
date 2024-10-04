function solution(video_len, pos, op_start, op_end, commands) {
    const timeToNumber = (time) => {
        const [hours, minutes] = time.split(":").map(Number);
        
        return hours * 60 + minutes; 
    };
    
    const numberToTime = (number) => {
        const hours = parseInt(number / 60).toString().padStart(2, '0');
        const minutes = (number % 60).toString().padStart(2, '0');
        
        return `${hours}:${minutes}`;
    }
    
    const vl = timeToNumber(video_len);
    const os = timeToNumber(op_start);
    const oe = timeToNumber(op_end);
    let p = timeToNumber(pos);
    
    const prev = () => {
        if (p < 10) {
            p = 0;
        } else {
            p -= 10;
        }
    }
    
    const next = () => {
        if (vl - p < 10) {
            p = vl;
        } else {
            p += 10;
        }
    }
    
    const skip = () => {
        if (os <= p && p <= oe) {
            p = oe;
        }
    }
    
    
    skip();
    
    for (const cmd of commands) {
        if (cmd === 'next') {
            next();
        } else {
            prev();
        }
    
        skip();    
    }
    
    return numberToTime(p);
}