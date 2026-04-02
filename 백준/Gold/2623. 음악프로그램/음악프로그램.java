import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StringTokenizer st;
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    st = new StringTokenizer(br.readLine());
    int n = Integer.parseInt(st.nextToken()); // 가수의 수
    int m = Integer.parseInt(st.nextToken()); // 보조PD의 수

    ArrayList<ArrayList<Integer>> graph = new ArrayList<>();
    for (int i = 0; i <= n; i++) {
      graph.add(new ArrayList<>());
    }

    int[] inDegree = new int[n + 1];

    for (int i = 0; i < m; i++) {
      st = new StringTokenizer(br.readLine());

      int num = Integer.parseInt(st.nextToken());
      int[] arr = new int[num];

      for (int j = 0; j < num; j++) {
        arr[j] = Integer.parseInt(st.nextToken());
      }

      for (int j = 0; j < num - 1; j++) {
        graph.get(arr[j]).add(arr[j + 1]);
        inDegree[arr[j + 1]]++;
      }
    }

    Queue<Integer> queue = new ArrayDeque<>();
    for (int i = 1; i <= n; i++) {
      if (inDegree[i] == 0) {
        queue.add(i);
      }
    }

    int remain = n;

    while (!queue.isEmpty()) {
      int current = queue.poll();
      remain--;
      sb.append(current).append("\n");

      for (int num : graph.get(current)) {
        inDegree[num]--;

        if (inDegree[num] == 0) {
          queue.add(num);
        }
      }
    }

    System.out.println(remain > 0 ? 0 : sb);

  }
}