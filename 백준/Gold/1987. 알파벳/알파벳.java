import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StringTokenizer st;

  static int R, C;
  static char[][] map;
  static int answer = 1;

  static int[] dx = { -1, 1, 0, 0 };
  static int[] dy = { 0, 0, -1, 1 };

  public static void main(String[] args) throws Exception {
    st = new StringTokenizer(br.readLine());

    R = Integer.parseInt(st.nextToken());
    C = Integer.parseInt(st.nextToken());

    map = new char[R][C];
    for (int i = 0; i < R; i++) {
      map[i] = br.readLine().toCharArray();
    }

    int startBit = 1 << (map[0][0] - 'A');
    dfs(0, 0, startBit, 1);

    System.out.println(answer);
  }

  static void dfs(int x, int y, int mask, int count) {
    answer = Math.max(answer, count);

    for (int d = 0; d < 4; d++) {
      int nx = x + dx[d];
      int ny = y + dy[d];

      if (nx < 0 || nx >= R || ny < 0 || ny >= C)
        continue;

      int nextBit = 1 << (map[nx][ny] - 'A');

      if ((mask & nextBit) != 0)
        continue;

      dfs(nx, ny, mask | nextBit, count + 1);
    }
  }
}