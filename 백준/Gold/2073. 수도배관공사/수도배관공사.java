import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int d = nextInt();
    int p = nextInt();

    int[][] pipe = new int[p + 1][2];

    for (int i = 1; i <= p; i++) {
      pipe[i] = new int[] { nextInt(), nextInt() };
    }

    // dp[i][j]: i번째 파이프까지 고려해서 길이 j를 만들 때의 수도관 최대 용량
    int[][] dp = new int[p + 1][d + 1];

    // 추후 최솟값 비교를 해야 하므로 가장 큰 값으로 설정
    dp[0][0] = Integer.MAX_VALUE;

    for (int i = 1; i <= p; i++) {
      for (int j = 0; j <= d; j++) {
        // i번째 파이프를 사용하는 경우
        int use = 0;

        if (j >= pipe[i][0]) {
          use = Math.min(dp[i - 1][j - pipe[i][0]], pipe[i][1]);
        }

        // i번째 파이프를 사용하지 않는 경우
        int notUse = dp[i - 1][j];

        dp[i][j] = Math.max(use, notUse);
      }
    }

    System.out.println(dp[p][d]);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}