import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;
import java.util.PriorityQueue;

public class Main {
  static class State implements Comparable<State> {
    int pos, time;

    State(int pos, int time) {
      this.pos = pos;
      this.time = time;
    }

    public int compareTo(State o) {
      return this.time - o.time;
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int k = nextInt();

    if (n == k) {
      System.out.println(0);
      return;
    }

    int[] minTime = new int[100_001];
    Arrays.fill(minTime, Integer.MAX_VALUE);

    PriorityQueue<State> queue = new PriorityQueue<>();
    queue.offer(new State(n, 0));

    while (!queue.isEmpty()) {
      State cur = queue.poll();

      if (cur.pos == k)
        break;

      if (cur.pos + 1 < 100_001 && minTime[cur.pos + 1] > cur.time + 1) {
        minTime[cur.pos + 1] = cur.time + 1;
        queue.offer(new State(cur.pos + 1, cur.time + 1));
      }

      if (cur.pos - 1 >= 0 && minTime[cur.pos - 1] > cur.time + 1) {
        minTime[cur.pos - 1] = cur.time + 1;
        queue.offer(new State(cur.pos - 1, cur.time + 1));
      }

      if (cur.pos * 2 < 100_001 && minTime[cur.pos * 2] > cur.time) {
        minTime[cur.pos * 2] = cur.time;
        queue.offer(new State(cur.pos * 2, cur.time));
      }
    }

    System.out.println(minTime[k]);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}