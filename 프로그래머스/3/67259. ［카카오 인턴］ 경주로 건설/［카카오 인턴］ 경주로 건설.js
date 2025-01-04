function solution(board) {
    const isValid = (x, y) => {
        return x >= 0 && x < N && y >= 0 && y < N;
    }
    
    const isBlocked = (x, y) => {
        return (x === 0 && y === 0) || !isValid(x, y) || board[x][y] === 1;
    }
    
    const calculateCost = (direction, prevDirection, cost) => {
        if (prevDirection === -1 || (prevDirection - direction) % 2 === 0) {
            return cost + 100;
        } else {
            return cost + 600;
        }
    }
    
    const isShouldUpdate = (x, y, direction, newCost) => {
        return visited[x][y][direction] === 0 || visited[x][y][direction] > newCost;
    }
    
    const queue = [];
    queue.push([0, 0, -1, 0]);
    const N = board.length;
    
    const directions = [
        [0, -1],
        [-1, 0],
        [0, 1],
        [1, 0],
    ];
    
    const visited = Array.from({ length: N }, () => 
                              Array.from({ length: N }, () => Array(4).fill(0)));
    
    let answer = Infinity;
    
    while (queue.length) {
        const [x, y, prevDirection, cost] = queue.shift();
        
        for (let direction = 0; direction < 4; direction++) {
            const [dx, dy] = directions[direction];
            const newX = x + dx;
            const newY = y + dy;
            
            if (isBlocked(newX, newY)) {
                continue;
            }
            
            const newCost = calculateCost(direction, prevDirection, cost);
            
            if (newX === N - 1 && newY === N - 1) {
                answer = Math.min(answer, newCost);
            } else if (isShouldUpdate(newX, newY, direction, newCost)) {
                queue.push([newX, newY, direction, newCost]);
                visited[newX][newY][direction] = newCost;
            }
            
        }
    }
    
    return answer;
}