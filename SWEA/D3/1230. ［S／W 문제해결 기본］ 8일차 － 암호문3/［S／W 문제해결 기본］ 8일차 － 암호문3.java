import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.ListIterator;
import java.util.StringTokenizer;

public class Solution {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));   
        StringTokenizer st;
        StringBuilder sb = new StringBuilder();

        for (int tc = 0; tc < 10; tc++) {
            br.readLine();  // 원본 암호문 뭉치 속 암호문의 개수
            st = new StringTokenizer(br.readLine());  // 원본 암호문 뭉치

            LinkedList<String> list = new LinkedList<>();
            ListIterator<String> iterator;

            while (st.hasMoreTokens()) {
                list.add(st.nextToken());
            }

            int m = Integer.parseInt(br.readLine());  // 명령어의 개수
            st = new StringTokenizer(br.readLine());  // 명령어

            for (int i = 0; i < m; i++) {
                String command = st.nextToken();

                int x, y;

                switch (command) {
                    case "I":
                        x = Integer.parseInt(st.nextToken());
                        y = Integer.parseInt(st.nextToken());
                        iterator = list.listIterator(x);
                        
                        for (int count = 0; count < y; count++) {
                            iterator.add(st.nextToken()); 
                        }
                        break;
                    case "D":
                        x = Integer.parseInt(st.nextToken());
                        y = Integer.parseInt(st.nextToken());
                        iterator = list.listIterator(x);

                        for (int count = 0; count < y; count++) {
                            iterator.next();
                            iterator.remove();
                        }
                        break;
                    case "A":
                        y = Integer.parseInt(st.nextToken());

                        for (int count = 0; count < y; count++) {
                            list.add(st.nextToken());
                        }
                        break;
                }
            }

            sb.append("#" + (tc + 1) + " ");

            for (String s : list.subList(0, 10)) {
                sb.append(s + " ");
            }

            sb.append("\n");
        }

        System.out.println(sb);

        br.close();
    }
}
