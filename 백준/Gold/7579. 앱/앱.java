import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int m = nextInt();

    int[] memory = new int[n + 1];
    for (int i = 1; i <= n; i++) {
      memory[i] = nextInt();
    }

    int[] cost = new int[n + 1];
    for (int i = 1; i <= n; i++) {
      cost[i] = nextInt();
    }

    int MAX_COST = 10000; // 문제에서 cost 최대 합

    // dp[c]: 비용 c로 확보 가능한 최대 메모리
    int[] dp = new int[MAX_COST + 1];

    for (int i = 1; i <= n; i++) {
      for (int c = MAX_COST; c >= cost[i]; c--) {
        dp[c] = Math.max(dp[c], dp[c - cost[i]] + memory[i]);
      }
    }

    for (int c = 0; c <= MAX_COST; c++) {
      if (dp[c] >= m) {
        System.out.println(c);
        break;
      }
    }
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}