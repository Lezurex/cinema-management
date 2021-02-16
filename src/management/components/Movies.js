import Movie from "../objects/Movie.js";
import Presentation from "../objects/Presentation.js";

export default {
    props: {
        halls: Array,
        movies: Array
    },
    data() {
        return {
            newMovie: new Movie(),
        }
    },
    template: `
      <main>
      <h1>Movies</h1>
      <p>Here you can manage all the movies playing in the cinema.</p>
      <div class="card">
        <div class="card-header">
          Add a new movie
        </div>
        <div class="card-body">
          <form class="form-floating">
            <input @keypress="updateNewMovie" type="text" class="form-control" id="add-title" placeholder="Movie title"
                   required>
            <label for="add-title">Movie title</label>
          </form>
          <br>
          <div class="form-floating">
            <textarea @keypress="updateNewMovie" maxlength="1000" class="form-control" placeholder="Description"
                      id="add-description"
                      style="height: 100px"></textarea>
            <label for="add-description">Movie description</label>
          </div>
          <br>
          <div id="add-presentation-list">
            <div v-for="presentation in newMovie.presentations" class="card">
              <div class="card-body">
                <div class="add-presentation-options">
                  <form class="form-floating">
                    <input v-model="presentation.time" type="datetime-local" :min="presentation.time" :value="presentation.time" class="form-control" placeholder="Time and date" required>
                    <label for="add-title">Time and Date</label>
                  </form>
                  <div class="form-floating">
                    <select v-model="presentation.hall" class="form-select">
                      <option v-for="hall in halls" :value="hall.uuid">Hall {{ hall.number }} ({{ hall.seatsX * hall.seatsZ }})</option>
                    </select>
                    <label>Movie hall</label>
                  </div>
                  <span @click="removePresentation(presentation)">X</span>
                </div>
              </div>
            </div>
          </div>
          <br>
          <button @click="newPresentation" class="btn btn-success">Add presentation</button>
        </div>

      </div>
      </main>`,
    methods: {
        updateNewMovie() {
            this.newMovie.setTitle(document.getElementById("add-title").value);
            this.newMovie.setDescription(document.getElementById("add-description").value);
        },
        newPresentation() {
            this.newMovie.presentations.push(new Presentation(undefined, new Date().toISOString().substr(0, 16) + "Z", this.halls[0], this.newMovie, []))
        },
        removePresentation(presentation) {
            let index = this.newMovie.presentations.indexOf(presentation);
            this.newMovie.presentations.splice(index, 1);
        }
    },
    mounted: function () {
        this.newMovie.presentations = [];
        this.newMovie.presentations.push(new Presentation(undefined, new DateTime.toFormat("yyyy-mm-dd\Thh:mm"), this.halls[0], this.newMovie, []))
    },
    computed: {
        minDateTime() {
            return new Date().toISOString();
        }
    }

}