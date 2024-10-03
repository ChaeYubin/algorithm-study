function solution(n, k, cmd) {
    const Node = function (index, prev) {
        this.index = index;
        this.prev = prev;
        this.next = null;
    };
    
    let prevNode = new Node(0);
    let select; // 선택된 노드
    
    // 연결리스트 생성
    for (let i = 1; i < n; i += 1) {
        const curNode = new Node(i, prevNode);
        prevNode.next = curNode;
        prevNode = curNode;
        
        // 처음 선택된 노드 저장
        if (i === k) {
            select = curNode;
        }
    }
    
    let trashStack = [];
    
    const moveSelectedNode = (count, direction) => {
        for (let i = 0; i < count; i += 1) {
            if (!select[direction]) break;
            select = select[direction];
        }
    }
    
    const deleteNode = () => {
        const prev = select.prev;
        const next = select.next;
        
        trashStack.push(select);
        
        // 삭제할 노드의 다음 칸이 null이라면 prev 선택
        select = next ? next : prev;
        
        if (prev) prev.next = next;
        if (next) next.prev = prev;
    }
    
    const recoverNode = () => {
        const targetNode = trashStack.pop();
        
        const prev = targetNode.prev;
        const next = targetNode.next;
        
        if (prev) prev.next = targetNode;
        if (next) next.prev = targetNode;
    }
    
    cmd.forEach((c) => {
        switch (c[0]) {
            case "U":
                moveSelectedNode(c.split(" ")[1], "prev");
                break;
            case "D":
                moveSelectedNode(c.split(" ")[1], "next");
                break;
            case "C":
                deleteNode();
                break;
            case "Z":
                recoverNode();
                break;
        }
    });
    
    let result = Array(n).fill("O");
    trashStack.forEach((node) => {
        result[node.index] = "X";
    })
    
    return result.join("");
}