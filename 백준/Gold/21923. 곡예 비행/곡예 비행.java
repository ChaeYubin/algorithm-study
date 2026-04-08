import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;
import java.io.IOException;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  static final long MIN_INF = (long) -1e18;
  static final long MAX_INF = (long) 1e18;

  static int n, m;
  static int[][] map;

  public static void main(String[] args) throws Exception {
    n = nextInt();
    m = nextInt();

    map = new int[n][m];

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        map[i][j] = nextInt();
      }
    }

    // up[i][j]: 맨 왼쪽 아래 칸에서 (i, j)까지의 상승 비행 점수
    long[][] up = makeUp();

    // down[i][j]: (i, j)에서 맨 오른쪽 아래 칸까지의 하강 비행 점수
    // (맨 오른쪽 아래 칸에서 (i, j)까지 가는 방향으로 생각)
    long[][] down = makeDown();

    long max = MIN_INF;

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < m; j++) {
        max = Math.max(max, up[i][j] + down[i][j]);
      }
    }

    System.out.println(max);
  }

  static long[][] makeUp() {
    long[][] up = new long[n][m];

    for (int i = 0; i < n; i++) {
      Arrays.fill(up[i], MIN_INF);
    }

    // 초기값 설정
    up[n - 1][0] = map[n - 1][0];

    for (int i = n - 2; i >= 0; i--) {
      up[i][0] = up[i + 1][0] + map[i][0];
    }

    for (int i = 1; i < m; i++) {
      up[n - 1][i] = up[n - 1][i - 1] + map[n - 1][i];
    }

    for (int i = n - 2; i >= 0; i--) {
      for (int j = 1; j < m; j++) {
        up[i][j] = Math.max(up[i + 1][j], up[i][j - 1]) + map[i][j];
      }
    }

    return up;
  }

  static long[][] makeDown() {
    long[][] down = new long[n][m];

    for (int i = 0; i < n; i++) {
      Arrays.fill(down[i], MIN_INF);
    }

    // 초기값 설정
    down[n - 1][m - 1] = map[n - 1][m - 1];

    for (int j = m - 2; j >= 0; j--) {
      down[n - 1][j] = down[n - 1][j + 1] + map[n - 1][j];
    }

    for (int i = n - 2; i >= 0; i--) {
      down[i][m - 1] = down[i + 1][m - 1] + map[i][m - 1];
    }

    for (int i = n - 2; i >= 0; i--) {
      for (int j = m - 2; j >= 0; j--) {
        down[i][j] = Math.max(down[i + 1][j], down[i][j + 1]) + map[i][j];
      }
    }

    return down;
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}