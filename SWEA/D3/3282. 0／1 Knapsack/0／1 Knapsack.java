import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

class Solution {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int T = nextInt();

    for (int tc = 1; tc <= T; tc++) {
      int n = nextInt();
      int k = nextInt();

      int[] v = new int[n + 1];
      int[] c = new int[n + 1];

      for (int i = 1; i <= n; i++) {
        v[i] = nextInt();
        c[i] = nextInt();
      }

      // i번째 물건까지 부피가 j인 가방에 넣었을 때 최대 가치
      int[][] dp = new int[n + 1][k + 1];

      for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= k; w++) {
          if (v[i] > w) {
            dp[i][w] = dp[i - 1][w];
          } else {
            dp[i][w] = Math.max(dp[i - 1][w - v[i]] + c[i], dp[i - 1][w]);
          }
        }
      }

      sb.append("#").append(tc).append(" ").append(dp[n][k]).append("\n");
    }

    System.out.print(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}