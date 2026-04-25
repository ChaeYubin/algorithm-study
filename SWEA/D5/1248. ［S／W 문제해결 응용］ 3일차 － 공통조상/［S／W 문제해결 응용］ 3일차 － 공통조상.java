import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayList;

public class Solution {
  static class Node {
    int parent;
    ArrayList<Integer> child;

    Node() {
      child = new ArrayList<>();
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  static Node[] tree;

  public static void main(String[] args) throws Exception {
    int t = nextInt();

    for (int tc = 1; tc <= t; tc++) {
      int v = nextInt();
      int e = nextInt();
      int v1 = nextInt();
      int v2 = nextInt();

      // 트리 구성
      tree = new Node[v + 1];
      for (int i = 0; i <= v; i++) {
        tree[i] = new Node();
      }

      for (int i = 0; i < e; i++) {
        int parent = nextInt();
        int child = nextInt();

        tree[parent].child.add(child);
        tree[child].parent = parent;
      }

      // 두 정점의 조상 찾기
      ArrayList<Integer> ancestor1 = new ArrayList<>();
      traverse(v1, ancestor1);

      ArrayList<Integer> ancestor2 = new ArrayList<>();
      traverse(v2, ancestor2);

      // 두 정점의 공통 조상 찾기
      int commonAncestor = findCommonAncestor(ancestor1, ancestor2);

      // 공통 조상을 루트로 하는 서브 트리의 크기
      int size = getSubTreeSize(tree[commonAncestor]);

      sb.append("#").append(tc).append(" ").append(commonAncestor).append(" ").append(size).append("\n");
    }

    System.out.println(sb);
  }

  static void traverse(int index, ArrayList<Integer> ancestor) {
    int parent = tree[index].parent;

    if (parent != 0) {
      traverse(parent, ancestor);
    }

    ancestor.add(index);
  }

  static int findCommonAncestor(ArrayList<Integer> ancestor1, ArrayList<Integer> ancestor2) {
    int commonAncestor = 1;
    int limit = ancestor1.size() > ancestor2.size() ? ancestor2.size() : ancestor1.size();

    for (int i = 0; i < limit; i++) {
      if (!ancestor1.get(i).equals(ancestor2.get(i))) {
        break;
      }

      commonAncestor = ancestor1.get(i);
    }

    return commonAncestor;
  }

  static int getSubTreeSize(Node root) {
    int size = 1; // 자기 자신 포함

    for (int child : root.child) {
      size += getSubTreeSize(tree[child]);
    }

    return size;
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}