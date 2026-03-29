import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;

public class Main {
  static class Edge {
    int to, weight;

    Edge(int to, int weight) {
      this.to = to;
      this.weight = weight;
    }
  }

  static class Node {
    int node, weight;

    Node(int node, int weight) {
      this.node = node;
      this.weight = weight;
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  static int n;
  static ArrayList<ArrayList<Edge>> tree;
  static int maxWeight;

  public static void main(String[] args) throws Exception {
    n = nextInt();
    tree = new ArrayList<>();

    for (int i = 0; i <= n; i++) {
      tree.add(new ArrayList<>());
    }

    for (int i = 0; i < n - 1; i++) {
      int parent = nextInt();
      int child = nextInt();
      int weight = nextInt();

      tree.get(parent).add(new Edge(child, weight));
      tree.get(child).add(new Edge(parent, weight));
    }

    // 1번 정점에서 가장 먼 정점 찾기
    int farNode = dfs(1);

    // farNode에서 가장 먼 정점 또 찾기, 그때의 가중치의 합이 정답
    dfs(farNode);

    System.out.println(maxWeight);
  }

  static int dfs(int node) {
    maxWeight = 0;

    boolean[] visited = new boolean[n + 1];
    int farNode = 0;

    Queue<Node> queue = new ArrayDeque<>();
    visited[node] = true;
    queue.offer(new Node(node, 0));

    while (!queue.isEmpty()) {
      Node cur = queue.poll();

      for (Edge edge : tree.get(cur.node)) {
        if (visited[edge.to])
          continue;

        int nextWeight = cur.weight + edge.weight;
        if (nextWeight > maxWeight) {
          maxWeight = nextWeight;
          farNode = edge.to;
        }

        visited[edge.to] = true;
        queue.offer(new Node(edge.to, nextWeight));
      }
    }

    return farNode;
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}