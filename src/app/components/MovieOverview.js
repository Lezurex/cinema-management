import Movie from '../objects/Movie.js';

export default {
    props: {
        movies: Array
    },
    data() {
        return {

        }
    },
    template: `
    <div id="movies-overview">
      <div class="card movie-card" v-for="movie in movies">
        <div class="card-body">
          <h5 class="card-title">{{movie.title}}</h5>
          <p class="card-text">{{truncateString(movie.description, 100)}}</p>
          <div class="card-text">
            <strong>Presentations:</strong>
            <ul>
              <li v-for="presentation in getNextPresentations(movie)">
                {{ getFormattedTime(presentation.date) }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `,
    methods: {
        truncateString(str, numChars) {
            str = str.slice(0, numChars) + "...";
            console.log(str);
            return str;
        },
        getNextPresentations(movie) {
            const maxCount = 5;
            let count = 0;
            let nextPresentations = []
            for (const presentation in movie.presentations) {
                count++;
                if (count >= maxCount) {
                    break;
                }
                nextPresentations.push(presentation);
            }
            return nextPresentations;
        },
        getFormattedTime(unix) {
            return DateTime.fromMillis(unix * 1000).toLocaleString();
        }
    },
    mounted: function () {
        console.log(DateTime);
    }

}