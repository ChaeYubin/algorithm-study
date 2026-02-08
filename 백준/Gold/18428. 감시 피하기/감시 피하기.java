import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

class Main {
    static int N;
    static ArrayList<Position> empty;
    static ArrayList<Position> teachers;
    static char[][] map;
    static boolean valid;
    static int[] dx = {-1, 1, 0, 0};
    static int[] dy = {0, 0, -1, 1};

    public static class Position {
        int x, y;

        public Position(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    public static boolean isValid() {
        for (Position teacher : teachers) {
            for (int d = 0; d < 4; d++) {
                int nx = teacher.x;
                int ny = teacher.y;

                while (true) {
                    nx += dx[d];
                    ny += dy[d];

                    if (nx < 0 || nx >= N || ny < 0 || ny >= N) break;
                    if (map[nx][ny] == 'O') break;
                    if (map[nx][ny] == 'S') return false;
                }
            }
        }

        return true;
    }

    public static void selectObstaclePosition(int count, int start) {
        if (valid) return;
        if (count == 3) {
            if (isValid()) {
                valid = true;
            }

            return;
        }  

        for (int i = start; i < empty.size(); i++) {
            Position pos = empty.get(i);
            map[pos.x][pos.y] = 'O';
            selectObstaclePosition(count + 1, i + 1);
            map[pos.x][pos.y] = 'X';
        }

    }

    public static void main(String args[]) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        N = Integer.parseInt(br.readLine());
        map = new char[N][N];
        empty = new ArrayList<>();
        teachers = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());
            for (int j = 0; j < N; j++) {
                map[i][j] = st.nextToken().charAt(0);

                if (map[i][j] == 'X') {
                    empty.add(new Position(i, j));
                }

                if (map[i][j] == 'T') {
                    teachers.add(new Position(i, j));
                }
            }
        }

        // 3개 장애물 놓기
        selectObstaclePosition(0, 0);

        System.out.println(valid ? "YES" : "NO");
    }
}