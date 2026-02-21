import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Main {
    static class Node {
        char value;
        Node left;
        Node right;

        public Node(char value) {
            this.value = value;
        }
    }
    
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());  // 노드 개수
        Node[] tree = new Node[N];

        for (int i = 0; i < N; i++) {
            String line = br.readLine();

            char parent = line.charAt(0);
            char leftChild = line.charAt(2);
            char rightChild = line.charAt(4);

            int rootIndex = parent - 'A';

            if (tree[rootIndex] == null) {
                tree[rootIndex] = new Node(parent);  // 아직 부모 노드가 생성되지 않은 경우 생성
            }

            if (leftChild != '.') {
                Node node = new Node(leftChild);

                tree[rootIndex].left = node;
                tree[leftChild - 'A'] = node;
            }

            if (rightChild != '.') {
                Node node = new Node(rightChild);

                tree[rootIndex].right = node;
                tree[rightChild - 'A'] = node;
            }
        }

        preOrder(tree[0]);
        sb.append("\n");

        inOrder(tree[0]);
        sb.append("\n");
        
        postOrder(tree[0]);

        System.out.println(sb);
    }

    static void preOrder(Node tree) {
        if (tree == null) return;

        sb.append(tree.value);
        preOrder(tree.left);
        preOrder(tree.right);
    }

    static void inOrder(Node tree) {
        if (tree == null) return;

        inOrder(tree.left);
        sb.append(tree.value);
        inOrder(tree.right);
    }

    static void postOrder(Node tree) {
        if (tree == null) return;
        
        postOrder(tree.left);
        postOrder(tree.right);
        sb.append(tree.value);
    }
}
