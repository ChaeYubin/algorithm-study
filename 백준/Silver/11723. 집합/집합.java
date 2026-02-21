import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StringBuilder sb = new StringBuilder();

    public static void main(String[] args) throws Exception {
        int M = Integer.parseInt(br.readLine());

        Set<Integer> set = new HashSet<>();
        Set<Integer> allSet = new HashSet<>();

        for (int i = 1; i <= 20; i++) {
            allSet.add(i);
        }

        while (M-- > 0) {
            String[] operator = br.readLine().split(" ");
            String command = operator[0];
            int num = 0;

            if (operator.length > 1) {
                num = Integer.parseInt(operator[1]);
            }

            switch (command) {
                case "add":
                    set.add(num);
                    break;
                case "remove":
                    set.remove(num);
                    break;
                case "check":
                    sb.append(set.contains(num) ? 1 : 0).append("\n");
                    break;
                case "toggle":
                    if (set.contains(num)) set.remove(num);
                    else set.add(num);
                    break;
                case "all":
                    set.clear();
                    for (Integer item : allSet) set.add(item);
                    break;
                case "empty":
                    set.clear();
                    break;
            }
        }

        System.out.println(sb);
    }
}
