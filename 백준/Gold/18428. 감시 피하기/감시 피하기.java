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

    public static class Position {
        int x, y;

        public Position(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    public static boolean isValid() {
        for (Position teacher : teachers) {
            int curX = teacher.x;
            int curY = teacher.y;
            
            while (--curX >= 0 && map[curX][curY] != 'O') {
                if (map[curX][curY] == 'S') return false;
            }

            curX = teacher.x;
            curY = teacher.y;
            while (++curX < N && map[curX][curY] != 'O') {
                if (map[curX][curY] == 'S') return false;
            }

            curX = teacher.x;
            curY = teacher.y;
            while (--curY >= 0 && map[curX][curY] != 'O') {
                if (map[curX][curY] == 'S') return false;
            }
            
            curX = teacher.x;
            curY = teacher.y;
            while (++curY < N && map[curX][curY] != 'O') {
                if (map[curX][curY] == 'S') return false;
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