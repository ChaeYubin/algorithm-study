import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  static int remainStudent;
  static int[] select;
  static boolean[] visited, finished;

  public static void main(String[] args) throws Exception {
    int t = nextInt();

    for (int tc = 0; tc < t; tc++) {
      int n = nextInt();

      select = new int[n + 1];
      visited = new boolean[n + 1]; // 한 번이라도 DFS에서 방문한 적 있는지
      finished = new boolean[n + 1]; // 이 노드 처리가 완전히 끝났는지
      remainStudent = n;

      for (int i = 1; i <= n; i++) {
        select[i] = nextInt();
      }

      for (int i = 1; i <= n; i++) {
        if (visited[i])
          continue;

        dfs(i);
      }

      sb.append(remainStudent).append("\n");
    }

    System.out.println(sb);
  }

  // cur부터 시작하는 경로 전체를 따라가면서 사이클 탐지 + 처리
  static void dfs(int cur) {
    visited[cur] = true;
    int next = select[cur];

    if (!visited[next]) {
      dfs(next);
    } else if (!finished[next]) {
      // 사이클 발생
      int temp = next;

      while (true) {
        remainStudent--;
        temp = select[temp];

        if (temp == next)
          break;
      }
    }

    finished[cur] = true;
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}