import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StreamTokenizer;
import java.util.ArrayDeque;
import java.util.LinkedList;
import java.util.Queue;

public class Main {
    static BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
    static StreamTokenizer st = new StreamTokenizer(br);

    static int N;  // 구역의 개수
    static int[] population;  // 1번 ~ N번 구역의 인구수
    static LinkedList<LinkedList<Integer>> graph;
    static boolean[] selected;
    static int minDiff;

    public static void main(String[] args) throws Exception {
        N = nextInt();
        population = new int[N + 1];
        graph = new LinkedList<>();
        
        for (int i = 0; i <= N; i++) {
            graph.add(new LinkedList<>());
        }

        minDiff = Integer.MAX_VALUE;

        // 인구 수 입력
        for (int i = 1; i <= N; i++) {
            population[i] = nextInt();
        }

        // 인접 구역 그래프 구성
        for (int i = 1; i <= N; i++) {
            int nearZoneCount = nextInt();

            for (int j = 0; j < nearZoneCount; j++) {
                int nearZone = nextInt();
                graph.get(i).add(nearZone);
                graph.get(nearZone).add(i);
            }
        }

        // 부분 집합 구하기
        selected = new boolean[N + 1];
        subset(1);

        System.out.println(minDiff == Integer.MAX_VALUE ? -1 : minDiff);

    }

    static void subset(int num) {
        if (num == N + 1) {
            // 선택된 구역이 0개 or N개이면 리턴 (각 선거구는 구역을 적어도 하나 이상 포함해야 함)
            int count = 0;

            for (int i = 1; i <= N; i++) {
                if (selected[i]) count++;
            }

            if (count == 0 || count == N) return;

            // 선거구 구성
            LinkedList<Integer> zone1 = new LinkedList<>();
            LinkedList<Integer> zone2 = new LinkedList<>();

            for (int i = 1; i <= N; i++) {
                if (selected[i]) zone1.add(i);
                else zone2.add(i);
            }
            
            // 두 선거구 내의 구역이 모두 연결되어 있다면 인구 수 비교하여 최솟값 갱신
            if (isConnected(zone1) && isConnected(zone2)) {
                minDiff = Math.min(minDiff, Math.abs(getPopulation(zone1) - getPopulation(zone2)));
            }

            return;
        }

        selected[num] = true;
        subset(num + 1);

        selected[num] = false;
        subset(num + 1);
    }

    static boolean isConnected(LinkedList<Integer> zone) {
        boolean[] visited = new boolean[N + 1];

        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(zone.get(0));
        visited[zone.get(0)] = true;

        while (!queue.isEmpty()) {
            int cur = queue.poll();
            
            for (int next : graph.get(cur)) {
                if (visited[next] || !zone.contains(next)) continue;

                visited[next] = true;
                queue.offer(next);
            }
        }

        for (int num : zone) {
            if (!visited[num]) return false;
        }

        return true;
    }

    static int getPopulation(LinkedList<Integer> zone) {
        int result = 0;

        for (int num : zone) {
            result += population[num];
        }

        return result;
    }

    static int nextInt() throws IOException {
        st.nextToken();
        return (int) st.nval;
    }
}
