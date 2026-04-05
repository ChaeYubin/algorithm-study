import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.io.IOException;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int t = nextInt();

    while (t-- > 0) {
      int a = nextInt();
      int b = nextInt();

      int value = 1;
      for (int i = 0; i < b; i++) {
        value *= a;
        value %= 10;
      }

      sb.append(value == 0 ? 10 : value).append("\n");
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}