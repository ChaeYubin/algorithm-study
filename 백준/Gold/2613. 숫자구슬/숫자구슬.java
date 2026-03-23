import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayList;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);

  public static void main(String[] args) throws Exception {
    int n = nextInt();
    int m = nextInt();

    int[] biz = new int[n];
    int maxBiz = 0;
    int bizSum = 0;

    for (int i = 0; i < n; i++) {
      biz[i] = nextInt();
      maxBiz = Math.max(maxBiz, biz[i]);
      bizSum += biz[i];
    }

    int low = maxBiz;
    int high = bizSum;
    int answer = bizSum;

    // 1. 최대 그룹 합 중 최솟값 찾기
    while (low <= high) {
      int mid = (low + high) / 2; // 그룹의 합
      int count = getGroupCount(biz, n, mid);

      if (count <= m) {
        answer = mid;
        high = mid - 1;
      } else {
        low = mid + 1;
      }
    }

    // 2. answer 기준으로 정확히 m개 복원
    ArrayList<Integer> bizCount = restoreGroups(biz, n, m, answer);

    System.out.println(answer);
    for (int count : bizCount) {
      System.out.print(count + " ");
    }
  }

  static ArrayList<Integer> restoreGroups(int[] biz, int n, int m, int limit) {
    ArrayList<Integer> result = new ArrayList<>();

    int sum = 0;
    int cnt = 0;

    for (int i = n - 1; i >= 0; i--) {
      // 현재 구슬을 넣으면 limit 초과
      // 또는 남은 구슬 수보다 남은 그룹 수가 같아져서 반드시 끊어야 하는 경우
      if (sum + biz[i] > limit || i + 1 < m - result.size()) {
        result.add(cnt);
        sum = biz[i];
        cnt = 1;
      } else {
        sum += biz[i];
        cnt++;
      }
    }

    result.add(cnt);

    // 뒤에서부터 넣었으므로 뒤집기
    ArrayList<Integer> answer = new ArrayList<>();
    for (int i = result.size() - 1; i >= 0; i--) {
      answer.add(result.get(i));
    }

    return answer;
  }

  static int getGroupCount(int[] biz, int n, int limit) {
    int count = 1;
    int sum = 0;

    for (int i = 0; i < n; i++) {
      if (sum + biz[i] > limit) {
        count++;
        sum = biz[i];
      } else {
        sum += biz[i];
      }
    }

    return count;
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}