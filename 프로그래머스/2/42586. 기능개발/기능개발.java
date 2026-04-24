import java.util.ArrayList;
import java.util.Queue;
import java.util.ArrayDeque;

class Solution {
    class Progress {
        int index, progress;
        
        Progress(int index, int progress) {
            this.index = index;
            this.progress = progress;
        }
    }
    
    public int[] solution(int[] progresses, int[] speeds) {
        ArrayList<Integer> answer = new ArrayList<>();
        Queue<Progress> queue = new ArrayDeque<>();

        for (int i = 0; i < progresses.length; i++) {
            queue.add(new Progress(i, progresses[i]));
        }

        int day = 1;

        while (!queue.isEmpty()) {
            int count = 0;
            Progress front = queue.peek();

            // 가장 앞에 있는 작업이 완료되었다면
            if ((front.progress + (day * speeds[front.index])) >= 100) {
                // 다음 작업들도 차례대로 완료되었는지 확인
                while (!queue.isEmpty()) {
                    Progress next = queue.peek();

                    if ((next.progress + (day * speeds[next.index])) >= 100) {
                        count++;
                        queue.poll();
                    } else {
                        break;
                    }
                }
            } else {
                day++;
            }

            if (count > 0) {
                answer.add(count);
            }
        }

        int[] arr = new int[answer.size()];

        for (int i = 0; i < answer.size(); i++) {
            arr[i] = answer.get(i);
        }

        return arr;
    }
}