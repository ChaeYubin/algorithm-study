import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.StringTokenizer;

public class Main {
    static StringBuilder sb = new StringBuilder();
    static int N, M;
    static int[] arr, result;
    static Set<String> set;

    static void dfs(int count) {
        if (count == M) {
            for (int i = 0; i < M; i++) {
                sb.append(result[i]).append(" ");
            }

            set.add(sb.toString());
            sb.setLength(0);

            return;
        }

        for (int i = 0; i < N; i++) {
            result[count] = arr[i];
            dfs(count + 1);
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
        set = new LinkedHashSet<>();

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(arr);

        dfs(0);

        for (String s : set) {
            sb.append(s).append("\n");
        }

        System.out.println(sb);
    }
}
