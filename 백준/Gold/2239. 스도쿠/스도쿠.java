import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.TreeSet;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StringBuilder sb = new StringBuilder();

  static int[][] sudoku;
  static ArrayList<int[]> emptyList;
  static int index;
  static boolean end;

  public static void main(String[] args) throws Exception {
    sudoku = new int[9][9];
    emptyList = new ArrayList<>();

    for (int i = 0; i < 9; i++) {
      char[] row = br.readLine().toCharArray();

      for (int j = 0; j < 9; j++) {
        sudoku[i][j] = row[j] - 48;

        if (sudoku[i][j] == 0) {
          emptyList.add(new int[] { i, j });
        }
      }
    }

    dfs(0);

    for (int[] row : sudoku) {
      for (int num : row) {
        sb.append(num);
      }

      sb.append("\n");
    }

    System.out.println(sb);
  }

  // 들어갈 수 있는 수들만 순회
  static void dfs(int index) {
    if (end) { // 정답을 구했다면 더이상 진행하지 않음
      return;
    }

    if (index == emptyList.size()) { // 종료 조건
      end = true;
      return;
    }

    TreeSet<Integer> candidates = getCandidates(index);
    if (candidates.size() <= 0) {
      return;
    }

    int[] pos = emptyList.get(index);

    for (int num : candidates) {
      sudoku[pos[0]][pos[1]] = num;
      dfs(index + 1);

      if (end)
        return;

      sudoku[pos[0]][pos[1]] = 0;
    }
  }

  static TreeSet<Integer> getCandidates(int index) {
    int[] pos = emptyList.get(index);
    int r = pos[0];
    int c = pos[1];

    TreeSet<Integer> set = new TreeSet<>();

    for (int i = 1; i <= 9; i++) {
      set.add(i);
    }

    // 행과 열 확인
    for (int i = 0; i < 9; i++) {
      if (set.contains(sudoku[r][i]))
        set.remove(sudoku[r][i]);

      if (set.contains(sudoku[i][c]))
        set.remove(sudoku[i][c]);
    }

    // 3x3 확인
    for (int i = (r / 3) * 3; i < (r / 3) * 3 + 3; i++) {
      for (int j = (c / 3) * 3; j < (c / 3) * 3 + 3; j++) {
        if (set.contains(sudoku[i][j]))
          set.remove(sudoku[i][j]);
      }
    }

    return set;
  }
}