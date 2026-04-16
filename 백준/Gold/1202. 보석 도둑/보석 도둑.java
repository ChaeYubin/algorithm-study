import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.PriorityQueue;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt(); // 보석 개수
    int k = nextInt(); // 가방 개수

    ArrayList<int[]> gemList = new ArrayList<>();

    for (int i = 0; i < n; i++) {
      gemList.add(new int[] { nextInt(), nextInt() }); // [보석 무게, 보석 가격]
    }

    int[] c = new int[k];

    for (int i = 0; i < k; i++) {
      c[i] = nextInt();
    }

    Collections.sort(gemList, (o1, o2) -> Integer.compare(o1[0], o2[0])); // 보석 무게 기준 오름차순 정렬
    Arrays.sort(c); // 가방 무게 기준 오름차순 정렬

    PriorityQueue<Integer> pq = new PriorityQueue<>(Collections.reverseOrder());
    int p = 0;
    long result = 0;

    // 가방을 작은 것부터 보면서, 넣을 수 있는 보석 중 가장 비싼 것 선택
    for (int i = 0; i < k; i++) {
      // 현재 가방에 넣을 수 있는 무게의 보석인 경우
      while (p < n && gemList.get(p)[0] <= c[i]) {
        // pq에 보석 가격 넣기
        pq.add(gemList.get(p)[1]);
        p++;
      }

      if (!pq.isEmpty()) {
        // 보석 가격이 큰 것부터 뽑기
        result += pq.poll();
      }
    }

    System.out.println(result);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
