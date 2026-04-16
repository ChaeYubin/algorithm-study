import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.Arrays;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int[] arr = new int[n];

    for (int i = 0; i < n; i++) {
      arr[i] = nextInt();
    }

    int[] lis = new int[n]; // lis[i]: 길이가 i+1인 증가 부분 수열을 만들 때 가능한 최소 끝값
    int len = 0; // 현재까지 만든 LIS의 길이

    for (int i = 0; i < n; i++) {
      // arr[i]가 lis 배열에 들어갈 위치를 이분탐색으로 찾기
      // 값이 존재하면 -> 해당 인덱스, 없으면 -> (-(삽입위치) - 1) 형태로 반환
      int pos = Arrays.binarySearch(lis, 0, len, arr[i]);

      // 값이 존재하지 않는 경우 -> 삽입 위치로 변환
      if (pos < 0)
        pos = -(pos + 1);

      // pos 위치에 값을 추가하거나 교체
      // pos == len: arr[i]가 현재까지의 모든 값보다 큼 -> LIS 길이를 1 증가시키는 새로운 값
      // pos < len: 기존 값을 더 작은 값으로 교체
      lis[pos] = arr[i];

      // 만약 맨 뒤에 추가된 경우 → LIS 길이 증가
      if (pos == len)
        len++;
    }

    System.out.println(len);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}
