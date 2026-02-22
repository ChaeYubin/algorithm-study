import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// 음의 사이클의 존재 여부를 확인하는 문제 
// -> 벨만 포드 알고리즘
public class Main {
    static class Edge {
        int from;   // 시작 정점
        int to;     // 도착 정점
        int cost;   // 가중치 (도로는 +, 웜홀은 -)

        Edge(int from, int to, int cost) {
            this.from = from;
            this.to = to;
            this.cost = cost;
        }
    }

    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StreamTokenizer st = new StreamTokenizer(br);
    static StringBuilder sb = new StringBuilder();

    static int N, M, W;
    static List<Edge> edges;

    public static void main(String[] args) throws Exception {
        int TC = nextInt();

        while (TC-- > 0) {
            N = nextInt();  // 지점의 수
            M = nextInt();  // 도로의 개수
            W = nextInt();  // 웜홀의 개수

            edges = new ArrayList<>();

            for (int i = 0; i < M; i++) {
                int S = nextInt();
                int E = nextInt();
                int T = nextInt();

                // 도로는 양방향, 걸리는 시간은 양수
                edges.add(new Edge(S, E, T));
                edges.add(new Edge(E, S, T));
            }

            for (int i = 0; i < W; i++) {
                int S = nextInt();
                int E = nextInt();
                int T = nextInt();

                // 웜홀은 단방향, 걸리는 시간은 음수
                edges.add(new Edge(S, E, -T));
            }

            boolean hasNegativeCycle = bellmanFord();

            sb.append(hasNegativeCycle ? "YES" : "NO").append("\n");
        }

        System.out.println(sb);
    }

    static boolean bellmanFord() {
        int[] dist = new int[N + 1];

        // 모든 정점을 시작점처럼 만들기 위해 0으로 초기화
        // 실제 최단 거리가 아니라 음수 사이클로 인해 무한히 감소하는 구조가 있는지만 확인하면 됨
        Arrays.fill(dist, 0);  

        // 정점 수만큼 반복
        for (int i = 1; i <= N; i++) {
            boolean updated = false;

            // 모든 간선에 대해 가중치 체크
            for (Edge edge : edges) {
                if (dist[edge.to] > dist[edge.from] + edge.cost) {
                    dist[edge.to] = dist[edge.from] + edge.cost;
                    updated = true;

                    // 최단 경로는 최대 N-1개의 간선만 사용하면 확정됨
                    // 따라서 N번째 반복에서 갱신 발생 -> 음수 사이클 존재
                    if (i == N) return true;
                }
            }

            // 더 이상 갱신이 없다면 조기 종료
            if (!updated) break;
        }

        return false;
    }
    
    static int nextInt() throws IOException {
        st.nextToken();
        return (int) st.nval;
    }
}
