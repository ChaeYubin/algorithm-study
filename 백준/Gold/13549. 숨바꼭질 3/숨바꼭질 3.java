import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.Arrays;

// 0-1 BFS 풀이
// 가중치가 서로 다르므로(0과 1) 일반 BFS는 사용할 수 없다.
// time을 기준으로 PriorityQueue를 사용할 수도 있지만,
// 가중치가 0과 1이므로 0-1 BFS를 활용하는 것이 더 효율적이다.
public class Main {
  static class State {
    int pos, time;

    State(int pos, int time) {
      this.pos = pos;
      this.time = time;
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int k = nextInt();

    int[] minTime = new int[100_001];
    Arrays.fill(minTime, Integer.MAX_VALUE);
    minTime[n] = 0;

    ArrayDeque<State> deque = new ArrayDeque<>();
    deque.offer(new State(n, 0));

    while (!deque.isEmpty()) {
      State cur = deque.poll();

      if (cur.time > minTime[cur.pos])
        continue;

      if (cur.pos == k)
        break;

      if (cur.pos * 2 < 100_001 && minTime[cur.pos * 2] > cur.time) {
        minTime[cur.pos * 2] = cur.time;
        deque.addFirst(new State(cur.pos * 2, cur.time));
      }

      if (cur.pos + 1 < 100_001 && minTime[cur.pos + 1] > cur.time + 1) {
        minTime[cur.pos + 1] = cur.time + 1;
        deque.addLast(new State(cur.pos + 1, cur.time + 1));
      }

      if (cur.pos - 1 >= 0 && minTime[cur.pos - 1] > cur.time + 1) {
        minTime[cur.pos - 1] = cur.time + 1;
        deque.addLast(new State(cur.pos - 1, cur.time + 1));
      }
    }

    System.out.println(minTime[k]);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}