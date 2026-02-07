import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

class Main {
    private static int n, m;
    private static String[] guitars;
    private static long[] songs;
    private static int song;
    private static int guitar = 0;

    public static void makeGuitarSubset(int index, int guitarCount, long songInfo) {
        if (index == n) {
            int songCount = 0;
            for (int i = 0; i < m; i++) {
                if ((songInfo & (1L << i)) != 0) songCount++;
            }

            if (song < songCount) {
                song = songCount;
                guitar = guitarCount;
            } else if (song == songCount) {
                guitar = Math.min(guitar, guitarCount);
            }

            return;
        }

        makeGuitarSubset(index + 1, guitarCount + 1, songInfo | songs[index]);
        makeGuitarSubset(index + 1, guitarCount, songInfo);
    }

    public static void main(String args[]) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st;

        st = new StringTokenizer(br.readLine());
        n = Integer.parseInt(st.nextToken());
        m = Integer.parseInt(st.nextToken());

        guitars = new String[n];
        songs = new long[n];

        for (int i = 0; i < n; i++) {
            st = new StringTokenizer(br.readLine());
            guitars[i] = st.nextToken();
            songs[i] = Long.parseLong(st.nextToken().replace('Y', '1').replace('N', '0'), 2);
        }

        makeGuitarSubset(0, 0, 0);
        
        System.out.println(song == 0 ? -1 : guitar);
    }
}