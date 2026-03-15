import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.ArrayList;

public class Main {
  static class Edge {
    int to, weight;

    Edge(int to, int weight) {
      this.to = to;
      this.weight = weight;
    }
  }

  static class Node {
    int v;
    long dist;

    Node(int v, long dist) {
      this.v = v;
      this.dist = dist;
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  static int V;
  static ArrayList<ArrayList<Edge>> graph;
  static boolean[] visited;
  static int farNode;
  static long maxDist;

  public static void main(String[] args) throws Exception {
    V = nextInt();

    graph = new ArrayList<>();
    for (int i = 0; i <= V; i++) {
      graph.add(new ArrayList<>());
    }

    for (int i = 1; i <= V; i++) {
      int from = nextInt();
      int to = nextInt();

      while (to != -1) {
        int weight = nextInt();
        graph.get(from).add(new Edge(to, weight));
        to = nextInt();
      }
    }

    // 1번 정점에서 가장 먼 정점 찾기
    dfs(1);

    // 그 정점에서 다시 가장 먼 거리 찾기
    dfs(farNode);

    System.out.println(maxDist);
  }

  // 재귀 DFS는 스택오버플로우 위험 -> 직접 stack 사용해서 반복형으로 구현
  static void dfs(int start) {
    visited = new boolean[V + 1];
    maxDist = 0;
    farNode = start;

    ArrayDeque<Node> stack = new ArrayDeque<>();
    stack.push(new Node(start, 0));

    while (!stack.isEmpty()) {
      Node cur = stack.pop();

      if (visited[cur.v])
        continue;
      visited[cur.v] = true;

      if (cur.dist > maxDist) {
        maxDist = cur.dist;
        farNode = cur.v;
      }

      for (Edge next : graph.get(cur.v)) {
        if (!visited[next.to]) {
          stack.push(new Node(next.to, cur.dist + next.weight));
        }
      }
    }
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
