import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.TreeMap;
import java.util.Map.Entry;

public class Main {
  static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

  public static void main(String[] args) throws Exception {
    int n = Integer.parseInt(br.readLine());

    TreeMap<Long, Integer> map = new TreeMap<>();

    for (int i = 0; i < n; i++) {
      long num = Long.parseLong(br.readLine());
      map.put(num, map.getOrDefault(num, 0) + 1);
    }

    long result = 0;
    int maxCount = 0;

    for (Entry<Long, Integer> entry : map.entrySet()) {
      long key = entry.getKey();
      int count = entry.getValue();

      if (count == maxCount && result > key) {
        result = key;
      }
      if (count > maxCount) {
        maxCount = entry.getValue();
        result = key;
      }
    }

    System.out.println(result);
  }
}