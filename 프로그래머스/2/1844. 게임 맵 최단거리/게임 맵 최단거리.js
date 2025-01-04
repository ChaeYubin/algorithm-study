class Queue {
    items = [];
    front = 0;
    rear = 0;
    
    push(item) {
        this.items.push(item);
        this.rear++;
    }
    
    pop() {
        return this.items[this.front++]; 
    }
    
    isEmpty() {
        return this.front === this.rear;
    }
    
}

function solution(maps) {
    const dx = [1, 0, -1, 0];
    const dy = [0, 1, 0, -1];
    
    const n = maps.length;
    const m = maps[0].length;
    
    const dis = Array.from({ length: n }, () => Array(m).fill(-1));
    dis[0][0] = 1;
    
    const queue = new Queue();
    queue.push([0, 0]);
    
    while (!queue.isEmpty()) {
        const [x, y] = queue.pop();
        
        for (let i = 0; i < 4; i++) {
            const [nx, ny] = [x + dx[i] , y + dy[i]];
            
            if (nx < 0 || 
                nx >= n || 
                ny < 0 || 
                ny >= m || 
                maps[nx][ny] === 0) {
                continue;
            }
            
            if (dis[nx][ny] === -1) {
                queue.push([nx, ny]);
                dis[nx][ny] = dis[x][y] + 1;
            }
        }
    }
    
    return dis[n - 1][m - 1];
    
}