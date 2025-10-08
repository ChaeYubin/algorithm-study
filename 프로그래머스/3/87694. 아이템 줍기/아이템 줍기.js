function solution(rectangle, characterX, characterY, itemX, itemY) {
    // 좌표를 2배로 확장 (선을 점으로 표현하기 위해)
    const scale = 2;
    const scaledRect = rectangle.map(rect => rect.map(v => v * scale));
    
    // 지형을 표현할 배열 생성
    const maxX = Math.max(...scaledRect.map(v => v[2]));
    const maxY = Math.max(...scaledRect.map(v => v[3]));
    
    const board = Array.from({ length: maxX + 1 }, () => Array(maxY + 1).fill(0));
    
    for (let [x1, y1, x2, y2] of scaledRect) {
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                if ((x === x1 || x === x2 || y === y1 || y === y2) && board[x][y] !== 2) {
                    board[x][y] = 1;  // 직사각형 내부가 아닌 경우에만 테두리 표시
                } else {
                    board[x][y] = 2;  // 직사각형 내부 표시
                }
            }
        }
    }
    
    const dx = [0, 1, 0, -1];
    const dy = [1, 0, -1, 0];
    
    const queue = [];
    queue.push([characterX * scale, characterY * scale, 0]);
    
    while (queue.length > 0) {
        const [x, y, count] = queue.shift();
        
        if (x === itemX * scale && y === itemY * scale) return count / 2;  // 좌표를 2배로 늘렸으므로 실제 거리는 절반
        
        for (let i = 0; i < 4; i++) {
            const nx = x + dx[i];
            const ny = y + dy[i];
            
            // 범위를 벗어나거나 테두리가 아니면 스킵
            if (nx < 0 || nx > maxX || ny < 0 || ny > maxY || board[nx][ny] !== 1) continue;
            
            board[nx][ny] = 3;  // 방문 처리
            queue.push([nx, ny, count + 1]);
        }
    }
}