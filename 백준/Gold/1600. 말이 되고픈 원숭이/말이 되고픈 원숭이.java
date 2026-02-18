import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
    static class Position {
        int r, c, k, move;  // k: (r, c)까지 오는 데 사용한 말 이동 개수

        public Position(int r, int c, int move, int k) {
            this.r = r;
            this.c = c;
            this.k = k;
            this.move = move;
        }
    }

    static int k, w, h;
    static int[][] map;  // 0: 평지, 1: 장애물
    static boolean[][][] visited;
    static int[][] horseDirection = {{-1, -2}, {-2, -1}, {-2, 1}, {-1, 2}, {1, -2}, {2, -1}, {1, 2}, {2, 1}};
    static int[][] monkeyDirection = {{1, 0}, {-1, 0}, {0, -1}, {0, 1}};
    
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        k = Integer.parseInt(br.readLine());

        st = new StringTokenizer(br.readLine());
        int w = Integer.parseInt(st.nextToken());
        int h = Integer.parseInt(st.nextToken());

        map = new int[h][w];
        visited = new boolean[h][w][k + 1];

        for (int i = 0; i < h; i++) {
            st = new StringTokenizer(br.readLine());

            for (int j = 0; j < w; j++) {
                map[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int answer = -1;

        Queue<Position> queue = new ArrayDeque<>();
        queue.offer(new Position(0, 0, 0, 0));
        visited[0][0][0] = true;

        while (!queue.isEmpty()) {
            Position pos = queue.poll();

            if (pos.r == h - 1 && pos.c == w - 1) {
                answer = pos.move;
                break;
            }

            for (int i = 0; i < 4; i++) {
                int nr = pos.r + monkeyDirection[i][0];
                int nc = pos.c + monkeyDirection[i][1];

                if (nr < 0 || nr >= h || nc < 0 || nc >= w || map[nr][nc] == 1 || visited[nr][nc][pos.k]) continue; 

                queue.offer(new Position(nr, nc, pos.move + 1, pos.k));
                visited[nr][nc][pos.k] = true;
            }

            if (pos.k + 1 > k) continue;

            for (int i = 0; i < 8; i++) {
                int nr = pos.r + horseDirection[i][0];
                int nc = pos.c + horseDirection[i][1];

                if (nr < 0 || nr >= h || nc < 0 || nc >= w || map[nr][nc] == 1 || visited[nr][nc][pos.k + 1]) continue; 

                queue.offer(new Position(nr, nc, pos.move + 1, pos.k + 1));
                visited[nr][nc][pos.k + 1] = true;
            }
        }

        System.out.println(answer);
    }
}
