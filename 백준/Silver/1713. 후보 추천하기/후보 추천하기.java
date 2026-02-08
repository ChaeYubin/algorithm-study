import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;
import java.util.StringTokenizer;

class Main {
    public static class Candidate {
        int recommendCount;
        int postedTime;

        public Candidate(int recommendCount, int postedTime) {
            this.recommendCount = recommendCount;
            this.postedTime = postedTime;
        }
    }

    public static void removeCandidate(Map<Integer, Candidate> frame) {
        int targetStudent = -1;
        int minRecommend = Integer.MAX_VALUE;
        int oldestTime = Integer.MAX_VALUE;

        for (Map.Entry<Integer, Candidate> entry : frame.entrySet()) {
            Candidate c = entry.getValue();

            if (c.recommendCount < minRecommend ||
                (c.recommendCount == minRecommend && c.postedTime < oldestTime)) {
                minRecommend = c.recommendCount;
                oldestTime = c.postedTime;
                targetStudent = entry.getKey();
            }
        }

        frame.remove(targetStudent);
    }

    public static void printResult(Map<Integer, Candidate> frame) {
        int[] result = frame.keySet().stream().mapToInt(Integer::intValue).sorted().toArray();

        StringBuilder sb = new StringBuilder();
        for (int num : result) {
            sb.append(num).append(" ");
        }
        
        System.out.print(sb);
    }

    public static void main(String args[]) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        int frameLimit = Integer.parseInt(br.readLine());
        int totalRecommend = Integer.parseInt(br.readLine());

        Map<Integer, Candidate> frame = new HashMap<>();
        int currentTime = 0;

        st = new StringTokenizer(br.readLine());
        for (int i = 0; i < totalRecommend; i++) {
            int student = Integer.parseInt(st.nextToken());

            if (frame.containsKey(student)) {
                frame.get(student).recommendCount++;
                continue;
            }

            if (frame.size() == frameLimit) {
                removeCandidate(frame);
            }

            frame.put(student, new Candidate(1, currentTime++));
        }

        printResult(frame);
    }
}