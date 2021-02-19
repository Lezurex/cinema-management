import Movie from "../../app/objects/Movie.js";
import Presentation from "../../app/objects/Presentation.js";

export default {
    props: {
        movie: Movie,
        halls: Array
    },
    data() {
        return {
            expanded: false,
            errorMsg: ""
        }
    },
    template: `
      <div class="movie-list-element-header">
      {{ movie.title }}
      <button @click="expandcollapse"
              class="btn btn-primary">{{ expanded ? "&uarr;" : "&darr;" }}
      </button>
      </div>

      <div class="movie-list-element-body" v-if="expanded">
      <div class="form-floating mb-3">
        <input v-model="movie.title" type="text" id="floatingInput" class="form-control" placeholder="Title">
        <label for="floatingInput">Movie title</label>
      </div>
      <br>
      <div class="form-floating">
            <textarea v-model="movie.description" maxlength="1000" class="form-control" placeholder="Description"
                      id="add-description"
                      style="height: 100px"></textarea>
        <label for="add-description">Movie description</label>
      </div>
      <br>
      <div id="add-presentation-list">
        <div v-for="presentation in movie.presentations" class="card">
          <div class="card-body">
            <div class="error-msg" v-if="halls.length === 0">Please first add at least one hall to your cinema!
            </div>
            <div class="add-presentation-options">
              <form class="form-floating">
                <input :min="minDateTime" :value="dateToInputTime(presentation.date)" type="datetime-local" class="form-control"
                       placeholder="Time and date" required>
                <label for="add-title">Time and Date</label>
              </form>
              <div class="form-floating">
                <select v-model="presentation.hall.uuid" class="form-select">
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
      <div class="d-flex justify-content-between">
        <button @click="addPresentation" class="btn btn-success">&plus; Add presentation</button>
        <button @click="saveMovie" class="btn btn-success">&plus; Add new movie</button>
      </div>
      <br>
      <div class="error-msg" v-html="errorMsg" v-if="errorMsg !== ''"></div>
      </div>
      
    `,
    methods: {
        expandcollapse() {
            if (this.expanded === false) {
                this.expanded = true;
            } else {
                this.expanded = false;
            }
        },
        dateToInputTime(date) {
            return date.toFormat("yyyy-LL-dd'T'HH:mm");
        },
        removePresentation(presentation) {
            let index = this.movie.presentations.indexOf(presentation);
            this.movie.presentations.splice(index, 1);
        },
        addPresentation() {
            if (this.halls.length > 0) {
                this.movie.presentations.push(new Presentation(undefined, new DateTime.now(), this.halls[0].uuid, this.movie, []))
            } else {
                this.movie.presentations.push(new Presentation(undefined, new DateTime.now(), undefined, this.movie, []))
            }
        },
        saveMovie() {

        }

    },
    computed: {
        minDateTime() {
            return new DateTime.now().toFormat("yyyy-LL-dd'T'HH:mm")
        }
    }
}