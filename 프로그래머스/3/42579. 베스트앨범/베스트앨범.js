function solution(genres, plays) {
    const genreMap = new Map();
    
    // 장르별 정보 구성
    for (let i = 0; i < genres.length; i++) {
        const genre = genres[i];
        const play = plays[i];
        
        if (!genreMap.has(genre)) {
            genreMap.set(genre, { sum: 0, songs: [] });
        }
        
        const data = genreMap.get(genre);
        data.sum += play;
        data.songs.push({ play, number: i});
    }
    
    // 장르별 정렬 
    const sortedGenres = Array.from(genreMap.entries()).sort((a, b) => b[1].sum - a[1].sum);
    
    const answer = [];
    
    // 장르 내 노래 정렬
    for (const [genre, data] of sortedGenres) {
        const topSongs = data.songs.sort((a, b) => b.play - a.play || a.number - b.number).slice(0, 2);
        
        answer.push(...topSongs.map(song => song.number));
    }
    
    return answer;
}
