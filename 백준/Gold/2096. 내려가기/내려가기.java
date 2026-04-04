import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;
import java.io.IOException;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int[][] arr = new int[n][3];

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < 3; j++) {
        arr[i][j] = nextInt();
      }
    }

    // dp[i][0]: dp[i - 1][0], dp[i - 1][1] 중에 최댓값
    // dp[i][1]: dp[i - 1][0], dp[i - 1][1], dp[i - 1][2] 중에 최댓값
    // dp[i][2]: dp[i - 1][1], dp[i - 1][2] 중에 최댓값
    int[][] maxDP = new int[n][3];
    maxDP[0] = Arrays.copyOf(arr[0], 3);

    for (int i = 1; i < n; i++) {
      maxDP[i][0] = Math.max(maxDP[i - 1][0], maxDP[i - 1][1]) + arr[i][0];
      maxDP[i][1] = Math.max(Math.max(maxDP[i - 1][0], maxDP[i - 1][1]), maxDP[i - 1][2]) + arr[i][1];
      maxDP[i][2] = Math.max(maxDP[i - 1][1], maxDP[i - 1][2]) + arr[i][2];
    }

    int max = Math.max(Math.max(maxDP[n - 1][0], maxDP[n - 1][1]), maxDP[n - 1][2]);

    int[][] minDP = new int[n][3];
    minDP[0] = Arrays.copyOf(arr[0], 3);

    for (int i = 1; i < n; i++) {
      minDP[i][0] = Math.min(minDP[i - 1][0], minDP[i - 1][1]) + arr[i][0];
      minDP[i][1] = Math.min(Math.min(minDP[i - 1][0], minDP[i - 1][1]), minDP[i - 1][2]) + arr[i][1];
      minDP[i][2] = Math.min(minDP[i - 1][1], minDP[i - 1][2]) + arr[i][2];
    }

    int min = Math.min(Math.min(minDP[n - 1][0], minDP[n - 1][1]), minDP[n - 1][2]);

    System.out.println(max + " " + min);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}