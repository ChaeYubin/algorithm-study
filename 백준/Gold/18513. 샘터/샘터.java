import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;
import java.util.Set;
import java.util.HashSet;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());
        int n = Integer.parseInt(st.nextToken());
        int k = Integer.parseInt(st.nextToken());
        Set<Integer> visited = new HashSet<>();

        Queue<int[]> queue = new ArrayDeque<>();

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < n; i++) {
            int num = Integer.parseInt(st.nextToken());
            visited.add(num);
            queue.offer(new int[] { num, 0 });
        }

        long unhappiness = 0;
        int[] direction = { -1, 1 };

        while (!queue.isEmpty()) {
            int[] arr = queue.poll();
            int pos = arr[0];  
            int distance = arr[1];

            for (int i = 0; i < 2; i++) {
                if (k == 0) break;  

                int nextPos = pos + direction[i];
                int nextDistance = distance + 1;
            
                if (visited.contains(nextPos)) continue;

                k--;  // 집 배치
                unhappiness += nextDistance;  // 불행도 갱신
                visited.add(nextPos);  // 중복 방지 처리
                queue.offer(new int[] {nextPos, nextDistance});  // 다음 탐색에 추가
            }

            if (k == 0) break;
        }

        System.out.print(unhappiness);
    }
}
