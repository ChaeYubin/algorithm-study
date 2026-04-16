import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();

    int[] arr = new int[n];

    for (int i = 0; i < n; i++) {
      arr[i] = nextInt();
    }

    int p1 = 0;
    int p2 = n - 1;

    int[] result = new int[2];
    int min = Integer.MAX_VALUE;

    while (p1 < p2) {
      int sum = arr[p1] + arr[p2];

      if (min > Math.abs(sum)) {
        min = Math.abs(sum);
        result = new int[] { arr[p1], arr[p2] };
      }

      if (sum > 0) {
        p2--;
      } else if (sum < 0) {
        p1++;
      } else {
        min = 0;
        break;
      }
    }

    System.out.println(result[0] + " " + result[1]);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
