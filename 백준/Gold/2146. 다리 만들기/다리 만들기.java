import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.Queue;

public class Main {
    static class Position {
        int x, y;

        public Position(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StreamTokenizer st = new StreamTokenizer(br);
    static StringBuilder sb = new StringBuilder();

    static int N;
    static int[][] map;
    static boolean[][] visited;
    static Queue<Position> queue = new ArrayDeque<>();
    static int[] dx = {0, 1, -1, 0};  // 우, 하, 상, 좌
    static int[] dy = {1, 0, 0, -1};
    static int minBridgeLength = Integer.MAX_VALUE;
    static int[][] owner;  // 어떤 섬에서 확장된 영역인지
    static int[][] dist;  // 해당 섬에서부터의 거리

    static int nextInt() throws IOException {
        st.nextToken();
        return (int) st.nval;
    }

    static void landMarking(int x, int y, int num) {
        queue.offer(new Position(x, y));
        map[x][y] = num;
        visited[x][y] = true;

        while (!queue.isEmpty()) {
            Position cur = queue.poll();

            for (int i = 0; i < 4; i++) {
                int nx = cur.x + dx[i];
                int ny = cur.y + dy[i];

                if (nx < 0 || nx >= N || ny < 0 || ny >= N || visited[nx][ny] || map[nx][ny] == 0) continue;

                queue.offer(new Position(nx, ny));
                map[nx][ny] = num;
                visited[nx][ny] = true;
            }
        }
    }

    public static void main(String[] args) throws Exception {
        N = nextInt();
        map = new int[N][N];
        visited = new boolean[N][N];
        owner = new int[N][N];
        dist = new int[N][N];

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                map[i][j] = nextInt();
            }
        }

        // 1. BFS로 대륙 마킹
        int landNum = 3;  // 대륙 표시는 3부터 시작

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (map[i][j] == 1) {
                    landMarking(i, j, landNum);
                    landNum++;
                }
            }
        }

        // 2. 모든 육지 큐에 넣기
        queue.clear();
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (map[i][j] > 0) {
                    owner[i][j] = map[i][j];
                    dist[i][j] = 0;
                    queue.offer(new Position(i, j));
                }
            }
        }

        // 3. 최단 경로로 만나는 다른 대륙 찾기
        while (!queue.isEmpty()) {
            Position cur = queue.poll();

            for (int d = 0; d < 4; d++) {
                int nx = cur.x + dx[d];
                int ny = cur.y + dy[d];

                if (nx < 0 || nx >= N || ny < 0 || ny >= N) continue;
                
                if (owner[nx][ny] == 0) {
                    // 아직 아무 섬도 확장하지 않은 바다라면
                    owner[nx][ny] = owner[cur.x][cur.y];
                    dist[nx][ny] = dist[cur.x][cur.y] + 1;
                    queue.offer(new Position(nx, ny));
                } else if (owner[nx][ny] != owner[cur.x][cur.y]) {
                    // 이미 다른 섬이 확장한 영역이라면
                    int answer = dist[nx][ny] + dist[cur.x][cur.y];

                    minBridgeLength = Math.min(minBridgeLength, answer);
                }
            }
        }

        System.out.println(minBridgeLength);
    }
}