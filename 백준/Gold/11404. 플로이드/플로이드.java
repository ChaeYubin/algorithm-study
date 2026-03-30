import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  static final int MAX = 10_000_000;

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int m = nextInt();

    int[][] graph = new int[n + 1][n + 1];
    for (int i = 0; i <= n; i++) {
      Arrays.fill(graph[i], MAX);
      graph[i][i] = 0; // 자기 자신으로 가는 비용은 0으로 초기화
    }

    for (int i = 0; i < m; i++) {
      int a = nextInt();
      int b = nextInt();
      int c = nextInt();

      graph[a][b] = Math.min(graph[a][b], c);
    }

    for (int k = 1; k <= n; k++) {
      for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= n; j++) {
          graph[i][j] = Math.min(graph[i][j], graph[i][k] + graph[k][j]);
        }
      }
    }

    for (int i = 1; i <= n; i++) {
      for (int j = 1; j <= n; j++) {
        sb.append(graph[i][j] == MAX ? 0 : graph[i][j]).append(" ");
      }

      sb.append("\n");
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}