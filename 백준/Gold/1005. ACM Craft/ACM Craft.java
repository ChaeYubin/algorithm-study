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
    int t = nextInt();

    for (int tc = 0; tc < t; tc++) {
      int n = nextInt(); // 건물 개수
      int k = nextInt(); // 건설순서 규칙 개수

      int[] time = new int[n]; // 각 건물당 건설에 걸리는 시간
      for (int i = 0; i < n; i++) {
        time[i] = nextInt();
      }

      // 그래프 구성
      ArrayList<ArrayList<Integer>> graph = new ArrayList<>();
      for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
      }

      int[] inDegree = new int[n];

      for (int i = 0; i < k; i++) {
        int s = nextInt() - 1;
        int e = nextInt() - 1;

        graph.get(s).add(e);
        inDegree[e]++;
      }

      int w = nextInt() - 1; // 승리하기 위해 건설해야 할 건물의 인덱스

      Queue<Integer> queue = new ArrayDeque<>();
      int[] result = new int[n];

      for (int i = 0; i < n; i++) {
        if (inDegree[i] == 0) {
          queue.add(i);
          result[i] = time[i];
        }
      }

      while (!queue.isEmpty()) {
        int current = queue.poll();

        for (int next : graph.get(current)) {
          // 선행되어야 하는 건설 중 가장 긴 시간이 걸리는 작업 이후에 건설 가능
          result[next] = Math.max(result[next], result[current] + time[next]);

          if (--inDegree[next] == 0) {
            queue.add(next);
          }
        }
      }

      sb.append(result[w]).append("\n");
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
