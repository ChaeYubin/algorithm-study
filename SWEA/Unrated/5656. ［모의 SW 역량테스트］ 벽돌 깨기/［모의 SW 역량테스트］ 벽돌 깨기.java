import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.Queue;

public class Solution {
  static class Block {
    int r, c;

    public Block(int r, int c) {
      this.r = r;
      this.c = c;
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  static int N, W, H;
  static int[][] originalMap;
  static int initialBlockCount;
  static int minRemainBlockCount;

  static int[] dr = { -1, 0, 1, 0 };
  static int[] dc = { 0, 1, 0, -1 };

  public static void main(String[] args) throws Exception {
    int T = nextInt();

    for (int tc = 1; tc <= T; tc++) {
      N = nextInt();
      W = nextInt();
      H = nextInt();

      initialBlockCount = 0;
      minRemainBlockCount = Integer.MAX_VALUE;
      originalMap = new int[H][W];

      for (int r = 0; r < H; r++) {
        for (int c = 0; c < W; c++) {
          originalMap[r][c] = nextInt();

          if (originalMap[r][c] > 0)
            initialBlockCount++;
        }
      }

      dfs(0, originalMap, initialBlockCount);

      sb.append("#").append(tc).append(" ").append(minRemainBlockCount).append("\n");
    }

    System.out.println(sb);
  }

  static void dfs(int depth, int[][] map, int remainBlocks) {
    // 이미 최적
    if (minRemainBlockCount == 0)
      return;

    // 남은 벽돌이 없으면 종료
    if (remainBlocks == 0) {
      minRemainBlockCount = 0;
      return;
    }

    // 구슬을 다 쓴 경우
    if (depth == N) {
      minRemainBlockCount = Math.min(minRemainBlockCount, remainBlocks);
      return;
    }

    boolean hasBlockColumn = false;

    for (int c = 0; c < W; c++) {
      int topRow = findTopRow(map, c);

      // 빈 열이면 쏠 의미 없음
      if (topRow == -1)
        continue;

      hasBlockColumn = true;

      int[][] copiedMap = copyMap(map);
      int brokenCount = breakBlocks(copiedMap, topRow, c);

      copiedMap = compress(copiedMap);

      dfs(depth + 1, copiedMap, remainBlocks - brokenCount);
    }

    // 모든 열이 빈 열이었다면 현재 remainBlocks가 답 후보
    if (!hasBlockColumn) {
      minRemainBlockCount = Math.min(minRemainBlockCount, remainBlocks);
    }
  }

  // 해당 열의 최상단 벽돌 찾기
  static int findTopRow(int[][] map, int c) {
    for (int r = 0; r < H; r++) {
      if (map[r][c] != 0)
        return r;
    }

    return -1;
  }

  // 벽돌 깨뜨리기
  static int breakBlocks(int[][] map, int startR, int startC) {
    Queue<Block> queue = new ArrayDeque<>();
    boolean[][] visited = new boolean[H][W];

    queue.offer(new Block(startR, startC));
    visited[startR][startC] = true;

    int brokenCount = 0;

    while (!queue.isEmpty()) {
      Block cur = queue.poll();
      int power = map[cur.r][cur.c];

      brokenCount++;
      map[cur.r][cur.c] = 0;

      for (int d = 0; d < 4; d++) {
        for (int dist = 1; dist < power; dist++) {
          int nr = cur.r + dr[d] * dist;
          int nc = cur.c + dc[d] * dist;

          if (isOut(nr, nc) || visited[nr][nc] || map[nr][nc] == 0)
            continue;

          visited[nr][nc] = true;
          queue.offer(new Block(nr, nc));
        }
      }
    }

    return brokenCount;
  }

  static int[][] compress(int[][] map) {
    int[][] compressedMap = new int[H][W];
    ArrayDeque<Integer> stack = new ArrayDeque<>();

    for (int c = 0; c < W; c++) {
      stack.clear();

      for (int r = 0; r < H; r++) {
        if (map[r][c] != 0) {
          stack.push(map[r][c]);
        }
      }

      int row = H - 1;
      while (!stack.isEmpty()) {
        compressedMap[row--][c] = stack.pop();
      }
    }

    return compressedMap;
  }

  static int[][] copyMap(int[][] map) {
    int[][] copiedMap = new int[H][W];
    for (int r = 0; r < H; r++) {
      copiedMap[r] = map[r].clone();
    }
    return copiedMap;
  }

  static boolean isOut(int r, int c) {
    return r < 0 || r >= H || c < 0 || c >= W;
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}