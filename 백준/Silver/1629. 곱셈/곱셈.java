import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    long a = nextLong();
    long b = nextLong();
    long c = nextLong();

    System.out.println(pow(a, b, c));
  }

  static long pow(long a, long b, long c) {
    if (b == 1)
      return a % c;

    long n = pow(a, b / 2, c);

    if (b % 2 == 0)
      return n * n % c;
    else
      return (n * n % c) * a % c;
  }

  static long nextLong() throws IOException {
    st.nextToken();
    return (long) st.nval;
  }
}
