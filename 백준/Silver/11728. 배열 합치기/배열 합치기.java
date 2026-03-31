import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int m = nextInt();

    int[] arrA = new int[n];
    int[] arrB = new int[m];

    for (int i = 0; i < n; i++) {
      arrA[i] = nextInt();
    }

    for (int i = 0; i < m; i++) {
      arrB[i] = nextInt();
    }

    int p1 = 0;
    int p2 = 0;

    while (p1 < n && p2 < m) {
      if (arrA[p1] <= arrB[p2]) {
        sb.append(arrA[p1++]).append(" ");
      } else {
        sb.append(arrB[p2++]).append(" ");
      }
    }

    while (p1 < n) {
      sb.append(arrA[p1++]).append(" ");
    }

    while (p2 < m) {
      sb.append(arrB[p2++]).append(" ");
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}