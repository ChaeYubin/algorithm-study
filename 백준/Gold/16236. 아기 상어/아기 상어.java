import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.*;

public class Main {

  static class Shark {
    int r, c, size, eatCount;

    Shark(int r, int c) {
      this.r = r;
      this.c = c;
      this.size = 2;
      this.eatCount = 0;
    }

    void eat(int nr, int nc) {
      this.r = nr;
      this.c = nc;
      eatCount++;

      if (eatCount == size) {
        size++;
        eatCount = 0;
      }
    }
  }

  static int n;
  static int[][] map;
  static Shark shark;
  static int time = 0;

  static int[] dr = { -1, 0, 0, 1 }; // ↑, ←, →, ↓
  static int[] dc = { 0, -1, 1, 0 };

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    n = nextInt();
    map = new int[n][n];

    for (int i = 0; i < n; i++) {
      for (int j = 0; j < n; j++) {
        map[i][j] = nextInt();

        if (map[i][j] == 9) {
          shark = new Shark(i, j);
          map[i][j] = 0; // 시작 위치 초기화
        }
      }
    }

    while (true) {
      int dist = bfs();

      if (dist == -1)
        break;

      time += dist;
    }

    System.out.println(time);
  }

  static int bfs() {
    Queue<int[]> q = new ArrayDeque<>();
    boolean[][] visited = new boolean[n][n];

    q.add(new int[] { shark.r, shark.c, 0 });
    visited[shark.r][shark.c] = true;

    int minDist = Integer.MAX_VALUE;
    int targetR = -1;
    int targetC = -1;

    while (!q.isEmpty()) {
      int[] cur = q.poll();
      int r = cur[0];
      int c = cur[1];
      int dist = cur[2];

      // 이미 더 먼 거리면 탐색 중단
      if (dist > minDist)
        break;

      // 먹을 수 있는 물고기
      if (map[r][c] > 0 && map[r][c] < shark.size) {
        if (dist < minDist ||
            (dist == minDist && (r < targetR || (r == targetR && c < targetC)))) {
          minDist = dist;
          targetR = r;
          targetC = c;
        }
      }

      for (int i = 0; i < 4; i++) {
        int nr = r + dr[i];
        int nc = c + dc[i];

        if (nr < 0 || nr >= n || nc < 0 || nc >= n)
          continue;
        if (visited[nr][nc])
          continue;
        if (map[nr][nc] > shark.size)
          continue;

        visited[nr][nc] = true;
        q.add(new int[] { nr, nc, dist + 1 });
      }
    }

    // 먹을 물고기 없음
    if (targetR == -1)
      return -1;

    // 먹기
    shark.eat(targetR, targetC);
    map[targetR][targetC] = 0;

    return minDist;
  }

  static int nextInt() throws Exception {
    st.nextToken();
    return (int) st.nval;
  }
}