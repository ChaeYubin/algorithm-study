import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();

    int[][] rocks = new int[n][2];
    for (int i = 1; i <= n - 1; i++) {
      rocks[i][0] = nextInt();
      rocks[i][1] = nextInt();
    }

    int k = nextInt();

    // dp[i][0]: i번 돌까지 오면서 매우 큰 점프를 쓰지 않은 최소 비용
    // dp[i][1]: i번 돌까지 오면서 매우 큰 점프를 한 번 쓴 최소 비용
    int[][] dp = new int[n + 1][2];
    for (int i = 2; i <= n; i++) {
      Arrays.fill(dp[i], Integer.MAX_VALUE);
    }

    for (int i = 2; i <= n; i++) {
      // 매우 큰 점프를 쓰지 않은 경우
      // 1) i-1번 돌에서 작은 점프
      if (dp[i - 1][0] != Integer.MAX_VALUE) {
        dp[i][0] = Math.min(dp[i][0], dp[i - 1][0] + rocks[i - 1][0]);
      }

      // 2) i-2번 돌에서 큰 점프
      if (i >= 3 && dp[i - 2][0] != Integer.MAX_VALUE) {
        dp[i][0] = Math.min(dp[i][0], dp[i - 2][0] + rocks[i - 2][1]);
      }

      // 매우 큰 점프를 이미 쓴 경우
      // 1) 이미 쓴 상태로 i-1번 돌에서 작은 점프
      if (dp[i - 1][1] != Integer.MAX_VALUE) {
        dp[i][1] = Math.min(dp[i][1], dp[i - 1][1] + rocks[i - 1][0]);
      }

      // 2) 이미 쓴 상태로 i-2번 돌에서 큰 점프
      if (i >= 3 && dp[i - 2][1] != Integer.MAX_VALUE) {
        dp[i][1] = Math.min(dp[i][1], dp[i - 2][1] + rocks[i - 2][1]);
      }

      // 3) 아직 안 쓴 상태에서 i-3번 돌에서 매우 큰 점프
      if (i >= 4 && dp[i - 3][0] != Integer.MAX_VALUE) {
        dp[i][1] = Math.min(dp[i][1], dp[i - 3][0] + k);
      }
    }

    System.out.println(Math.min(dp[n][0], dp[n][1]));
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}