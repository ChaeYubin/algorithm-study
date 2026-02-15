import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Main {
    static StringBuilder sb = new StringBuilder();
    static int N, M;
    static int[] arr, result;

    static void dfs(int count, int start) {
        if (count == M) {
            for (int i = 0; i < M; i++) {
                sb.append(result[i]).append(" ");
            }

            sb.append("\n");
            return;
        }

        for (int i = start; i < N; i++) {
            result[count] = arr[i];
            dfs(count + 1, i + 1);
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        arr = new int[N];
        result = new int[M];

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(arr);

        dfs(0, 0);

        System.out.println(sb);
    }
}
