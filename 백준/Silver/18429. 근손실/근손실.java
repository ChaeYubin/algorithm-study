import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

class Main {
    static int N, K;
    static int[] kit;
    static int count;

    public static void count(int index, int currentWeight, boolean[] selected) {
        if (currentWeight < 500) return;

        if (index == N) {
            count++;
            return;
        }
        
        for (int i = 0; i < N; i++) {
            if (selected[i]) continue;

            selected[i] = true;
            count(index + 1, currentWeight - K + kit[i], selected);
            selected[i] = false;
        }
    }

    public static void main(String args[]) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        K = Integer.parseInt(st.nextToken());

        kit = new int[N];

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < N; i++) {
            kit[i] = Integer.parseInt(st.nextToken());
        }

        count(0, 500, new boolean[N]);
        System.out.println(count);
    }
}