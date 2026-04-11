import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int k = nextInt();

    int[] arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = nextInt();
    }

    // dp[i]: i번째 돌로 갈 수 있는지 없는지 여부
    // 첫번째부터 n번째까지 사용할 수 있는 힘 <= k인 경우에만 true로 갱신

    boolean[] dp = new boolean[n];
    dp[0] = true; // 가장 왼쪽에 있는 돌에 위치

    for (int i = 0; i < n; i++) {
      for (int j = i + 1; j < n; j++) {
        if (dp[i] && (j - i) * (1 + Math.abs(arr[i] - arr[j])) <= k) {
          dp[j] = true;
        }

        // 가장 오른쪽 돌에 건너갈 수 있음이 확인되면 바로 리턴
        if (dp[n - 1]) {
          System.out.println("YES");
          return;
        }
      }
    }

    System.out.print("NO");
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }

}