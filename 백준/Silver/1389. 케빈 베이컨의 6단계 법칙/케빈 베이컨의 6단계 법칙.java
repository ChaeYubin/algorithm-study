import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Queue;
import java.util.Set;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StreamTokenizer st = new StreamTokenizer(br);

    static Queue<Integer> queue = new ArrayDeque<>();

    public static void main(String[] args) throws Exception {
        int n = nextInt();  // 유저 수
        int m = nextInt();  // 친구 관계 수

        // 1. 친구 관계 그래프 구성
        // 친구 관계가 중복되어 들어올 수 있기 때문에 중복 제거를 위해 Set 사용
        ArrayList<Set<Integer>> graph = new ArrayList<>();

        for (int i = 0; i <= n; i++) {
            graph.add(new HashSet<>());  
        }

        for (int i = 0; i < m; i++) {
            int a = nextInt();
            int b = nextInt();

            graph.get(a).add(b);
            graph.get(b).add(a);
        }

        // 2. 케빈 베이컨 게임 진행
        int minKevin = Integer.MAX_VALUE;
        int num = -1;
        
        for (int i = 1; i <= n; i++) {
            int kevin = 0;
            int step = 1;
            boolean[] visited = new boolean[n + 1];

            queue.clear();
            visited[i] = true;
            queue.offer(i);

            while (!queue.isEmpty()) {
                int size = queue.size();

                while (size-- > 0) {
                    int cur = queue.poll();

                    for (int friend : graph.get(cur)) {
                        if (visited[friend]) continue;

                        visited[friend] = true;
                        kevin += step;
                        queue.offer(friend);
                    }
                }

                step++;
            }

            if (kevin < minKevin) {
                minKevin = kevin;
                num = i;
            }
        }

        System.out.println(num == -1 ? minKevin : num);

    }

    static int nextInt() throws IOException {
        st.nextToken();
        return (int) st.nval;
    }
}
