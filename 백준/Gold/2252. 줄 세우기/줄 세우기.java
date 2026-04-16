import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int m = nextInt();

    ArrayList<ArrayList<Integer>> graph = new ArrayList<>();
    for (int i = 0; i <= n; i++) {
      graph.add(new ArrayList<>());
    }

    int[] inDegree = new int[n + 1];

    for (int i = 0; i < m; i++) {
      int shorter = nextInt();
      int taller = nextInt();

      graph.get(shorter).add(taller);
      inDegree[taller]++;
    }

    Queue<Integer> queue = new ArrayDeque<>();

    for (int i = 1; i <= n; i++) {
      if (inDegree[i] == 0) {
        queue.add(i);
      }
    }

    while (!queue.isEmpty()) {
      int current = queue.poll();
      sb.append(current).append(" ");

      for (int next : graph.get(current)) {
        if (--inDegree[next] == 0) {
          queue.add(next);
        }
      }
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
