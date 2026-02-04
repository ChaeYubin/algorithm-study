import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.ListIterator;

public class Main {
    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringBuilder sb = new StringBuilder();
        
        int n = Integer.parseInt(br.readLine());

        for (int i = 0; i < n; i++) {
            String line = br.readLine();
            LinkedList<Character> list = new LinkedList<>();
            ListIterator<Character> iterator = list.listIterator();

            for (char c : line.toCharArray()) {
                switch (c) {
                    case '<':
                        if (iterator.hasPrevious()) {
                            iterator.previous();
                        }
                        break;
                    case '>':
                        if (iterator.hasNext()) {
                            iterator.next();
                        }
                        break;
                    case '-':
                        if (iterator.hasPrevious()) {  // 삭제할 요소가 있는지 확인
                            iterator.previous();  // 이전 요소로 커서 이동
                            iterator.remove();  // 제거
                        }
                        break;
                    default:
                        iterator.add(c);
                }
            }

            for (char c : list) {
                sb.append(c);
            }
            
            sb.append("\n");
        }

        System.out.println(sb);
        br.close();
    }
}
