import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Solution {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int t = nextInt();

    for (int tc = 1; tc <= t; tc++) {
      int n = nextInt();
      int m = nextInt();

      boolean result = true;

      if ((m & ((1 << n) - 1)) == (1 << n) - 1) {
        result = true;
      } else {
        result = false;
      }

      sb.append("#").append(tc).append(" ").append(result ? "ON" : "OFF").append("\n");
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}