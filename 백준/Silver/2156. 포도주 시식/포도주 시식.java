import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.IOException;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        int[] wine = new int[n+1];
        for (int i = 1; i <= n; i++) {
            wine[i] = Integer.parseInt(br.readLine());
        }

        if (n == 1) {
            System.out.println(wine[1]);
            return;
        }

        // 초기값 설정
        int[] dp = new int[n+1];
        dp[1] = wine[1];
        if (n > 1) {
            dp[2] = wine[1] + wine[2];
        }

        /**
         * dp[i-1]  = i번째 잔을 안마시는경우
         * dp[i-2] + wine[i] = i-1번째 잔을 마시지 않고 현재 와인을 마시는 경우
         * dp[i-3] + wine[i-1] + wine[i] = i번째 잔과 i-1번째 잔을 마시고, i-2번째 잔을 마시지 않는 경우
         */
        for (int i = 3; i <= n; i++) {
            dp[i] = Math.max(dp[i-1], Math.max(dp[i-2] + wine[i], dp[i-3] + wine[i-1] + wine[i]));
        }

        System.out.println(dp[n]);
    }
}