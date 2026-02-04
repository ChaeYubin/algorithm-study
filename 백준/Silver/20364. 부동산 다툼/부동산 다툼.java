import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;
        StringBuilder sb = new StringBuilder();

        st = new StringTokenizer(br.readLine());

        int n = Integer.parseInt(st.nextToken());
        int q = Integer.parseInt(st.nextToken());

        int[] land = new int[n + 1];  // 0이면 빈 땅, 1이면 이미 점유된 땅

        for (int i = 0; i < q; i++) {
            int landNum = Integer.parseInt(br.readLine());
            int result = 0;

            int temp = landNum;

            while (temp > 1) {  // 부모 노드를 순차적으로 탐색
                if (land[temp] == 1) {
                    result = temp;
                }

                temp /= 2;
            }

            if (result == 0) {  // 빈 땅이었다면 점유했다고 표시
                land[landNum] = 1;
            }

            sb.append(result).append("\n");
        }

        System.out.println(sb);
        br.close();
    }
}
