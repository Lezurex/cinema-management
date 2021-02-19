import Movie from '../objects/Movie.js';

export default {
    props: {
        movies: Array
    },
    data() {
        return {}
    },
    template: `
      <div id="movies-overview">
      <div class="card movie-card" v-for="movie in movies">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <p class="card-text">{{ truncateString(movie.description, 200) }}</p>
          <div v-if="movie.presentations.length > 0" class="card-text">
            <strong>Presentations:</strong>
            <ul>
              <li v-for="presentation in getNextPresentations(movie)">
                {{ presentation.date.toLocaleString() + " at " + presentation.date.toFormat("HH:mm") }}
              </li>
            </ul>
          </div>
          <div v-else class="card-text">
            <p>No presentations scheduled yet.</p>
          </div>
        </div>
        <div class="card-footer">
          <button @click="openMovie(movie)" class="btn btn-primary">More details</button>
        </div>
      </div>
      </div>
    `,
    methods: {
        truncateString(str, numChars) {
            if (str.length > numChars) {
                str = str.slice(0, numChars);
                if (str.substr(str.length - 1, 1) === " ") {
                    str = str.substr(0, str.length - 1);
                }
                str += "...";
            }
            return str;
        },
        getNextPresentations(movie) {
            const maxCount = 5;
            let count = 0;
            let nextPresentations = []
            console.log(movie)
            for (let presentationIndex in movie.presentations) {
                let presentation = movie.presentations[presentationIndex];
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
        },
        openMovie(movie) {
            this.$emit("openmovie", movie);
        }
    },
    mounted: function () {
        console.log(DateTime);
    }

}