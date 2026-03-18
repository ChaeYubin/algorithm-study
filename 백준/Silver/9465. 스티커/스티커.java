import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  static int n;
  static int[][] arr;
  static int maxScore;

  public static void main(String[] args) throws Exception {
    int t = nextInt();

    while (t-- > 0) {
      int n = nextInt();
      int[][] arr = new int[2][n];

      // dp[0][i]: i열에서 아무것도 안 뜯은 경우의 최대 점수
      // dp[1][i]: i열에서 위쪽 스티커를 뜯은 경우의 최대 점수
      // dp[2][i]: i열에서 아래쪽 스티커를 뜯은 경우의 최대 점수
      int[][] dp = new int[3][n];

      for (int i = 0; i < 2; i++) {
        for (int j = 0; j < n; j++) {
          arr[i][j] = nextInt();
        }
      }

      // 0열 초기화
      dp[0][0] = 0; // 아무것도 안 뜯음
      dp[1][0] = arr[0][0]; // 윗 스티커 뜯음
      dp[2][0] = arr[1][0]; // 아랫 스티커 뜯음

      for (int i = 1; i < n; i++) {
        dp[0][i] = Math.max(dp[0][i - 1], Math.max(dp[1][i - 1], dp[2][i - 1]));
        dp[1][i] = arr[0][i] + Math.max(dp[0][i - 1], dp[2][i - 1]);
        dp[2][i] = arr[1][i] + Math.max(dp[0][i - 1], dp[1][i - 1]);
      }

      int answer = Math.max(dp[0][n - 1], Math.max(dp[1][n - 1], dp[2][n - 1]));
      sb.append(answer).append('\n');
    }

    System.out.print(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
