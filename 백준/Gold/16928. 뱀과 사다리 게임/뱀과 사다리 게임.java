import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;
import java.util.Queue;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StreamTokenizer st = new StreamTokenizer(br);

    public static void main(String[] args) throws Exception {
        int n = nextInt();  // 사다리의 수
        int m = nextInt();  // 뱀의 수

        Map<Integer, Integer> moveMap = new HashMap<>();  // 사다리와 뱀의 이동 정보를 저장

        for (int i = 0; i < n + m; i++) {
            moveMap.put(nextInt(), nextInt());
        }

        Queue<Integer> queue = new ArrayDeque<>();
        boolean[] visited = new boolean[101];

        visited[1] = true;
        queue.offer(1);

        int diceRollCount = 0;  // 주사위를 굴린 횟수

        while (!queue.isEmpty()) {
            int size = queue.size();
            diceRollCount++;

            while (size-- > 0) {
                int curNum = queue.poll();

                // 주사위 굴리기
                for (int dice = 1; dice <= 6; dice++) {
                    int nextNum = curNum + dice;

                    if (nextNum == 100) {
                        System.out.println(diceRollCount);
                        return;
                    }

                    // 100을 초과했거나 이미 방문했던 칸인 경우 skip
                    if (nextNum > 100 || visited[nextNum]) continue;

                    if (moveMap.containsKey(nextNum)) {
                        // 다음 번호 칸에 사다리나 뱀이 있는 경우
                        int move = moveMap.get(nextNum);

                        if (visited[move]) continue;

                        visited[move] = true;
                        queue.offer(move);
                    } else {
                        visited[nextNum] = true;
                        queue.offer(nextNum);
                    }

                }
            }
        }

    }

    static int nextInt() throws IOException {
        st.nextToken();
        return (int) st.nval;
    }
}
