import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();

    int completeTime = 0;
    int[] dp = new int[n + 1]; // dp[i]: i번 작업이 완료되는 가장 빠른 시간

    for (int i = 1; i <= n; i++) {
      int time = nextInt();
      int prevTaskCount = nextInt();

      dp[i] = time;

      for (int j = 0; j < prevTaskCount; j++) {
        int prevTask = nextInt();

        // 선행 작업이 있다면, 현재 작업은 선행 작업 중에 가장 오래 걸리는 작업 이후에 수행 가능
        dp[i] = Math.max(dp[i], dp[prevTask] + time);
      }

      // 전체 완료 시간은 따로 최댓값 트래킹해야 함
      completeTime = Math.max(completeTime, dp[i]);
    }

    System.out.println(completeTime);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}