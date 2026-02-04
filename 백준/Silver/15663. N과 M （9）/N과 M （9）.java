import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.LinkedHashSet;
import java.util.StringTokenizer;

public class Main {
    static StringBuilder sb = new StringBuilder();
    static int n, m;
    static boolean[] visited;
    static int[] arr;
    static int[] temp;
    static LinkedHashSet<String> set = new LinkedHashSet<>();
    
    public static void recursion(int level) {
        if (level == m) {
            for (int num : temp) {
                sb.append(num).append(" ");
            }

            set.add(sb.toString());
            sb.setLength(0);

            return;
        }

        int prev = -1;
        for (int i = 0; i < n; i++) {
            if (visited[i]) continue;
            if (prev == arr[i]) continue;

            visited[i] = true;
            temp[level] = arr[i];
            prev = arr[i];

            recursion(level + 1);
            visited[i] = false;
        }
    }

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());

        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());

        arr = new int[n];

        st = new StringTokenizer(br.readLine());

        for (int i = 0; i < n; i++) {
            arr[i] = Integer.parseInt(st.nextToken());
        }

        Arrays.sort(arr);  // 오름차순 정렬

        temp = new int[m];
        visited = new boolean[n];

        recursion(0);

        set.forEach(System.out::println);

        br.close();
    }
}
