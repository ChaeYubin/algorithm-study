import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayDeque;
import java.util.Queue;
import java.util.StringTokenizer;

public class Main {
  static class Position {
    int x, y;

    public Position(int x, int y) {
      this.x = x;
      this.y = y;
    }
  }
  
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StringTokenizer st;

  static int[] dx = {-1, 1, 0, 0};
  static int[] dy = {0, 0, -1, 1};

  public static void main(String[] args) throws Exception {
    st = new StringTokenizer(br.readLine());
    int r = Integer.parseInt(st.nextToken());
    int c = Integer.parseInt(st.nextToken());

    // 불, 지훈이 큐 각각 생성
    Queue<Position> fQueue = new ArrayDeque<>();
    Queue<Position> jQueue = new ArrayDeque<>();

    // 미로 입력받기
    char[][] maze = new char[r][c];
    
    for (int i = 0; i < r; i++) {
      String line = br.readLine();
      maze[i] = line.toCharArray();

      for (int j = 0; j < c; j++) {
        if (maze[i][j] == 'J') {
          jQueue.add(new Position(i, j));
        }

        if (maze[i][j] == 'F') {
          fQueue.add(new Position(i, j));
        }
      }
    }

    boolean[][] visited = new boolean[r][c];  // 지훈이의 방문 여부 관리

    // 1초마다 불 확산, 지훈이 이동 진행
    int time = 0;  // 현재까지 지난 시간

    while (!jQueue.isEmpty()) {
      int fQueueSize = fQueue.size();

      while (fQueueSize -- > 0) {
        Position curF = fQueue.poll();

        for (int i = 0; i < 4; i++) {
          int nx = curF.x + dx[i];
          int ny = curF.y + dy[i];

          if (nx < 0 || nx >= r || ny < 0 || ny >= c || maze[nx][ny] == '#' || maze[nx][ny] == 'F') continue;

          maze[nx][ny] = 'F';
          fQueue.add(new Position(nx, ny));
        }
      }

      int jQueueSize = jQueue.size();

      while (jQueueSize-- > 0) {
        Position curJ = jQueue.poll();

        for (int i = 0; i < 4; i++) {
          int nx = curJ.x + dx[i];
          int ny = curJ.y + dy[i];

          // 미로 탈출
          if (nx < 0 || nx >= r || ny < 0 || ny >= c) {
            System.out.println(time + 1);
            return;
          }

          if (maze[nx][ny] == 'F' || maze[nx][ny] == '#' || visited[nx][ny]) continue;

          visited[nx][ny] = true;
          jQueue.add(new Position(nx, ny));
        }
      }

      time++;
    }

    System.out.println("IMPOSSIBLE");
  }
}
