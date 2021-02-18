import Presentation from "../objects/Presentation.js";
import Movie from "../objects/Movie.js";

export default {
    props: {
        currentPresentation: Presentation,
        currentMovie: Movie
    },
    template: `
      <div class="content">
        <button @click="back" class="btn btn-primary">&larr; Back</button><br><br>
        <h1>Presentation of "{{currentMovie.title}}"</h1>
        <p>Date: {{currentPresentation.date.toLocaleString() + " at " + currentPresentation.date.toFormat("HH:mm")}}</p>
        <p>Movie hall: Hall {{currentPresentation.hall.number.toString()}}</p>
        <p class="text-center">Screen is here:</p>
        <hr class="screen-hr">
        <table class="table">
          <thead>
            
          </thead>
          <tbody>
            <tr>
              <th class="table-secondary">Seats</th>
              <th class="table-secondary" v-for="c in currentPresentation.hall.seatsX">{{c}}</th>
            </tr>
            <tr v-for="r in currentPresentation.hall.seatsZ">
              <th class="table-secondary">{{r}}</th>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    methods: {
        back() {
            this.$emit("back");
        }
    },
    mounted: function () {
        console.log(this.currentPresentation)
    }

}