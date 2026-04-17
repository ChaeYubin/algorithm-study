import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int c = nextInt();
    int n = nextInt();

    int[] dp = new int[c + 101]; // C 이상 고려
    Arrays.fill(dp, Integer.MAX_VALUE);
    dp[0] = 0;

    int[][] city = new int[n][2];

    for (int i = 0; i < n; i++) {
      city[i][0] = nextInt(); // cost
      city[i][1] = nextInt(); // customer
    }

    // 완전 배낭
    for (int i = 0; i < n; i++) {
      int cost = city[i][0];
      int customer = city[i][1];

      for (int j = customer; j < dp.length; j++) {
        if (dp[j - customer] != Integer.MAX_VALUE) {
          dp[j] = Math.min(dp[j], dp[j - customer] + cost);
        }
      }
    }

    // C 이상 중 최소값 찾기
    int answer = Integer.MAX_VALUE;
    for (int i = c; i < dp.length; i++) {
      answer = Math.min(answer, dp[i]);
    }

    System.out.println(answer);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}