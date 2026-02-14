import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Queue;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StreamTokenizer st = new StreamTokenizer(br);
    static StringBuilder sb = new StringBuilder();

    static int nextInt() throws IOException {
        st.nextToken();
        return (int) st.nval;
    }

    public static void main(String[] args) throws Exception {
        int N = nextInt();
        int M = nextInt();

        ArrayList<ArrayList<Integer>> graph = new ArrayList<>();  // graph[i][j]: i가 j의 선수과목
        int[] inDegree = new int[N + 1];

        for (int i = 0; i <= N; i++) {
            graph.add(new ArrayList<>());
        }
        
        // 그래프 입력
        for (int i = 0; i < M; i++) {
            int a = nextInt();
            int b = nextInt();

            graph.get(a).add(b);
            inDegree[b]++;
        }

        int[] result = new int[N + 1];  // result[i]: i번 과목을 이수할 수 있는 최소 학기

        int semester = 1;

        // 위상 정렬
        Queue<Integer> queue = new ArrayDeque<>();
        for (int i = 1; i <= N; i++) {
            if (inDegree[i] == 0) {
                queue.offer(i);
                result[i] = semester;
            }
        }

        while (!queue.isEmpty()) {
            int size = queue.size();  // 단계별 처리 위해 size 만큼만 반복
            
            for (int i = 0; i < size; i++) {
                int cur = queue.poll();

                for (int next : graph.get(cur)) {
                    inDegree[next]--;

                    if (inDegree[next] == 0) {
                        queue.offer(next);
                        result[next] = semester + 1;
                    }
                }
            }

            semester++;
        }

        for (int i = 1; i <= N; i++) {
            sb.append(result[i]).append(" ");
        }
        
        System.out.println(sb);
    }
}