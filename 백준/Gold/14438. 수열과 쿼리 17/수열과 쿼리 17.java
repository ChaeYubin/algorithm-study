import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;

public class Main {
  static class SegTree {
    int n;
    int[] arr;
    int[] tree;

    SegTree(int[] input) {
      n = input.length;

      arr = new int[n + 1];
      for (int i = 1; i <= n; i++) {
        arr[i] = input[i - 1];
      }

      tree = new int[4 * n];
      init(1, 1, n); // 트리 초기화
    }

    // 현재 node가 담당하는 구간 [start, end]의 최솟값을 계산해서 tree[node]에 저장
    int init(int node, int start, int end) {
      if (start == end) {
        return tree[node] = arr[start];
      }

      int mid = (start + end) / 2;

      int leftMin = init(node * 2, start, mid);
      int rightMin = init(node * 2 + 1, mid + 1, end);

      return tree[node] = Math.min(leftMin, rightMin);
    }

    void update(int index, int newValue) {
      arr[index] = newValue;
      update(1, 1, n, index, newValue);
    }

    // 반환값: 자기 구간의 최솟값
    int update(int node, int start, int end, int index, int newValue) {
      if (index < start || end < index) {
        return tree[node];
      }

      // 리프 노드에 도달 -> 바꾸려는 인덱스를 찾은 경우
      if (start == end) {
        return tree[node] = newValue;
      }

      int mid = (start + end) / 2;

      int leftMin = update(node * 2, start, mid, index, newValue);
      int rightMin = update(node * 2 + 1, mid + 1, end, index, newValue);

      return tree[node] = Math.min(leftMin, rightMin);
    }

    // left ~ right 구간합 구하기
    int query(int left, int right) {
      return query(1, 1, n, left, right);
    }

    // 현재 노드가 나타내는 구간: [start, end], 확인해야 하는 구간: [left, right]
    int query(int node, int start, int end, int left, int right) {
      if (right < start || end < left) {
        return Integer.MAX_VALUE;
      }

      // 현재 노드가 나타내는 구간이 [left, right]에 완전히 포함됨 -> 전체가 필요한 값
      if (left <= start && end <= right) {
        return tree[node];
      }

      int mid = (start + end) / 2;

      int leftMin = query(node * 2, start, mid, left, right);
      int rightMin = query(node * 2 + 1, mid + 1, end, left, right);

      return Math.min(leftMin, rightMin);
    }
  }

  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
  static StreamTokenizer st = new StreamTokenizer(br);
  static StringBuilder sb = new StringBuilder();

  public static void main(String[] args) throws Exception {
    int n = nextInt();

    int[] arr = new int[n];
    for (int i = 0; i < n; i++) {
      arr[i] = nextInt();
    }

    SegTree tree = new SegTree(arr);

    int m = nextInt();
    for (int mc = 0; mc < m; mc++) {
      int mode = nextInt();

      if (mode == 1) {
        int i = nextInt();
        int v = nextInt();

        tree.update(i, v);
      } else {
        int i = nextInt();
        int j = nextInt();

        sb.append(tree.query(i, j)).append("\n");
      }
    }

    System.out.println(sb);
  }

  static int nextInt() throws IOException {
    st.nextToken();
    return (int) st.nval;
  }
}