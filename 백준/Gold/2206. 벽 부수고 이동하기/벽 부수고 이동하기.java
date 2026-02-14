import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
    static class Position {
        int r, c, distance;
        boolean crashed;

        public Position(int r, int c, int distance, boolean crashed) {
            this.r = r;
            this.c = c;
            this.distance = distance;
            this.crashed = crashed;
        }
    }

    static int[] dr = {-1, 1, 0, 0};
    static int[] dc = {0, 0, -1, 1};

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());
        int N = Integer.parseInt(st.nextToken());
        int M = Integer.parseInt(st.nextToken());
        
        // 엣지 케이스 처리
        if (N == 1 && M == 1) {
            System.out.println(1);
            return;
        }

        boolean[][][] visited = new boolean[N][M][2];  // visited[i][j][k]: (i, j)에 (k) 부수지 않은(0)/벽을 부순(1) 상태로 방문한 경우

        // map 초기화
        char[][] map = new char[N][M];
        for (int i = 0; i < N; i++) {
            map[i] = br.readLine().toCharArray();
        }

        int minDistance = Integer.MAX_VALUE;

        // (0, 0)에서 (N-1, M-1)로 갈 수 있는 경로 확인하기
        Queue<Position> queue = new ArrayDeque<>();
        queue.add(new Position(0, 0, 1, false));
        visited[0][0][0] = true;

        while (!queue.isEmpty()) {
            Position cur = queue.poll();

            for (int i = 0; i < 4; i++) {
                int nr = cur.r + dr[i];
                int nc = cur.c + dc[i];
                int nd = cur.distance + 1;

                if (nr < 0 || nr >= N || nc < 0 || nc >= M || visited[nr][nc][cur.crashed ? 1 : 0]) continue;

                // (N-1, M-1) 칸에 도착했다면 거리 비교 후 최솟값 갱신
                if (nr == N - 1 && nc == M - 1 && nd < minDistance) {
                    minDistance = nd;
                    break;
                }

                if (map[nr][nc] == '1' && !cur.crashed) {
                    // 아직 벽을 하나도 안부쉈다면 부숴보기
                    queue.offer(new Position(nr, nc, nd, true));
                    visited[nr][nc][1] = true;
                } else if (map[nr][nc] == '0') {
                    // map[nr][nc]가 0이라면 기존 정보 그대로 가지고 전파
                    queue.offer(new Position(nr, nc, nd, cur.crashed));
                    visited[nr][nc][cur.crashed ? 1 : 0] = true;
                }
            }
        }

        System.out.println(minDistance == Integer.MAX_VALUE ? -1 : minDistance);
    }
}