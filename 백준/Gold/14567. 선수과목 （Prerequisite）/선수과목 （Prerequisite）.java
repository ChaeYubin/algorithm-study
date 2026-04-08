import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayList;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  @SuppressWarnings("unchecked")
  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int m = nextInt();

    ArrayList<Integer>[] prerequisite = new ArrayList[n + 1];
    for (int i = 0; i <= n; i++) {
      prerequisite[i] = new ArrayList<>();
    }

    for (int i = 0; i < m; i++) {
      int a = nextInt();
      int b = nextInt(); // a가 b의 선수과목

      prerequisite[b].add(a);
    }

    int[] dp = new int[n + 1]; // dp[i]: i번 과목을 이수하기 위한 최소 학기 수

    for (int i = 1; i <= n; i++) {
      dp[i] = 1;

      for (int pre : prerequisite[i]) {
        dp[i] = Math.max(dp[i], dp[pre] + 1);
      }
    }

    for (int i = 1; i <= n; i++) {
      sb.append(dp[i] + " ");
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}