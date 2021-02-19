import Movie from "../objects/Movie.js";

export default {
    props: {
        currentMovie: Movie
    },
    data() {
        return {}
    },
    template: `
      <div class="content">
      <button @click="back" class="btn btn-primary">&larr; Back</button>
      <br><br>
      <h1>{{ currentMovie.title }}</h1>
      <p>{{ currentMovie.description }}</p>
      <h3>Presentations</h3>
      <table v-if="currentMovie.presentations.length > 0" class="table table-white table-striped align-middle">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Cinema Hall</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="presentation in currentMovie.presentations">
            <td>{{presentation.date.toLocaleString()}}</td>
            <td>{{presentation.date.toFormat("HH:mm")}}</td>
            <td>Hall {{presentation.hall.number}}</td>
            <td><button @click="reserveSeat(presentation)" class="btn btn-info">Reserve a seat &rarr;</button></td>
          </tr>
        </tbody>
      </table>
      <p v-else>No presentations scheduled yet.</p>
      </div>
    `,
    methods: {
        back() {
            this.$emit("back");
        },
        reserveSeat(presentation) {
            this.$emit("reserveseat", presentation)
        }
    }
}