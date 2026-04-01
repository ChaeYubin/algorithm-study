import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  static int[] numOfChild;
  static ArrayList<Integer>[] list;

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int r = nextInt();
    int q = nextInt();

    list = new ArrayList[n + 1];
    for (int i = 0; i <= n; i++) {
      list[i] = new ArrayList<>();
    }

    numOfChild = new int[n + 1];
    Arrays.fill(numOfChild, 1);

    for (int i = 0; i < n - 1; i++) {
      int u = nextInt();
      int v = nextInt();

      list[u].add(v);
      list[v].add(u);
    }

    postOrderTraverse(r, -1);

    for (int i = 0; i < q; i++) {
      int root = nextInt();
      sb.append(numOfChild[root]).append("\n");
    }

    System.out.println(sb);
  }

  static void postOrderTraverse(int node, int parent) {
    for (int next : list[node]) {
      if (next != parent) {
        postOrderTraverse(next, node);
      }
    }

    if (parent != -1) {
      numOfChild[parent] += numOfChild[node];
    }
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}