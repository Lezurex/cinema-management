import Movie from "../../app/objects/Movie.js";
import Presentation from "../../app/objects/Presentation.js";

export default {
    props: {
        halls: Array,
        movies: Array
    },
    data() {
        return {
            newMovie: new Movie(),
            addErrorMsg: ""
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
            <input v-model="newMovie.title" type="text" class="form-control" id="add-title" placeholder="Movie title"
                   required>
            <label for="add-title">Movie title</label>
          </form>
          <br>
          <div class="form-floating">
            <textarea v-model="newMovie.description" maxlength="1000" class="form-control" placeholder="Description"
                      id="add-description"
                      style="height: 100px"></textarea>
            <label for="add-description">Movie description</label>
          </div>
          <br>
          <div id="add-presentation-list">
            <div v-for="presentation in newMovie.presentations" class="card">
              <div class="card-body">
                <div class="error-msg" v-if="halls.length === 0">Please first add at least one hall to your cinema!
                </div>
                <div class="add-presentation-options">
                  <form class="form-floating">
                    <input v-model="presentation.date" :min="minDateTime" type="datetime-local" class="form-control"
                           placeholder="Time and date" required>
                    <label for="add-title">Time and Date</label>
                  </form>
                  <div class="form-floating">
                    <select v-model="presentation.hall" class="form-select">
                      <option v-for="hall in halls" :value="hall.uuid">Hall {{ hall.number }} (
                        {{ hall.seatsX * hall.seatsZ }} Seats)
                      </option>
                    </select>
                    <label>Movie hall</label>
                  </div>
                  <span @click="removePresentation(presentation)">X</span>
                </div>
              </div>
            </div>
          </div>
          <br>
          <div class="d-flex justify-content-between">
            <button @click="newPresentation" class="btn btn-success">&plus; Add presentation</button>
            <button @click="submitNewMovie" class="btn btn-success">&plus; Add new movie</button>
          </div>
          <br>
          <div class="error-msg" v-html="addErrorMsg" v-if="addErrorMsg !== ''"></div>

        </div>

      </div>
      <br><br>
      <div class="card">
        <div class="card-header">
          Manage existing movies
        </div>
        <div class="card-body">
          <table v-if="movies.length > 0" class="table">
            <tbody>
              <tr v-for="movie in movies">
                <td><movieListElement :halls="halls" :movie="movie"></movieListElement></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      </main>`,
    methods: {
        newPresentation() {
            if (this.halls.length > 0) {
                this.newMovie.presentations.push(new Presentation(undefined, new DateTime.now().toFormat("yyyy-LL-dd'T'HH:mm"), this.halls[0].uuid, this.newMovie, []))
            } else {
                this.newMovie.presentations.push(new Presentation(undefined, new DateTime.now().toFormat("yyyy-LL-dd'T'HH:mm"), undefined, this.newMovie, []))
            }
        },
        removePresentation(presentation) {
            let index = this.newMovie.presentations.indexOf(presentation);
            this.newMovie.presentations.splice(index, 1);
        },
        submitNewMovie() {
            let title = document.getElementById("add-title");
            let description = document.getElementById("add-description");

            title.classList.remove("is-invalid");
            description.classList.remove("is-invalid");

            this.addErrorMsg = "";
            let valid = true;
            if (this.newMovie.title === "" || this.newMovie.title === undefined) {
                this.addErrorMsg += "<p>The title field is empty!</p>";
                valid = false;
                title.classList.add("is-invalid");
            }
            if (this.newMovie.description === "" || this.newMovie.description === undefined) {
                this.addErrorMsg += "<p>The description field is empty!</p>";
                valid = false;
                description.classList.add("is-invalid");
            }
            this.newMovie.presentations.forEach(presentation => {
                if (presentation.hall === undefined) {
                    this.addErrorMsg += "<p>Some presentation fields are empty!</p>";
                    valid = false;
                }
            });

            if (valid) {
                this.newMovie.postToAPI(this);
            }
        }
    },
    created: function () {
        this.newMovie.presentations = [];
        if (this.halls.length > 0) {
            this.newMovie.presentations.push(new Presentation(undefined, new DateTime.now().toFormat("yyyy-LL-dd'T'HH:mm"), this.halls[0].uuid, this.newMovie, []))
        }
    },
    computed: {
        minDateTime() {
            return new DateTime.now().toFormat("yyyy-LL-dd'T'HH:mm")
        }
    }

}