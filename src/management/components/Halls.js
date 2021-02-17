import Movie from "../objects/Movie.js";
import Presentation from "../objects/Presentation.js";
import Hall from "../objects/Hall.js";

export default {
    props: {
        halls: Array,
    },
    data() {
        return {
            newHall: new Hall(),
            addErrorMsg: ""
        }
    },
    template: `
      <main>
      <h1>Halls</h1>
      <p>Here you can manage all the halls existing in your cinema.</p>
      <div class="card">
        <div class="card-header">
          Add a new hall
        </div>
        <div class="card-body">
          <form class="form-floating">
            <input v-model="newHall.number" type="number" class="form-control" id="add-number" placeholder="Hall number"
                   required>
            <label for="add-title">Hall number</label>
          </form>
          <br>
          <div class="d-flex" id="add-seats-options">
            <form class="form-floating">
              <input v-model="newHall.seatsX" max="30" type="number" class="form-control" id="add-seatsX" placeholder="Hall number"
                     required>
              <label for="add-title">Seat columns</label>
            </form>
            <form class="form-floating">
              <input v-model="newHall.seatsZ" max="30" type="number" class="form-control" id="add-seatsZ" placeholder="Hall number"
                     required>
              <label for="add-title">Seat rows</label>
            </form>
          </div>
          
          <div class="d-flex justify-content-end">
            <button @click="submitNewHall" class="btn btn-success">&plus; Add new hall</button>
          </div>
          <br>
          <div class="error-msg" v-html="addErrorMsg" v-if="addErrorMsg !== ''"></div>

        </div>

      </div>
      </main>`,
    methods: {
        submitNewHall() {
            let number = document.getElementById("add-number");
            let seatsX = document.getElementById("add-seatsX");
            let seatsZ = document.getElementById("add-seatsZ");

            number.classList.remove("is-invalid");
            seatsX.classList.remove("is-invalid");
            seatsZ.classList.remove("is-invalid");

            this.addErrorMsg = "";
            let valid = true;
            if (this.newHall.number === "" || this.newHall.number === undefined) {
                this.addErrorMsg += "<p>The number field is empty!</p>";
                valid = false;
                number.classList.add("is-invalid");
            }
            if (this.newHall.seatsX === "" || this.newHall.seatsX === undefined) {
                this.addErrorMsg += "<p>The seat columns field is empty!</p>";
                valid = false;
                seatsX.classList.add("is-invalid");
            }
            if (this.newHall.seatsZ === "" || this.newHall.seatsZ === undefined) {
                this.addErrorMsg += "<p>The seat rows field is empty!</p>";
                valid = false;
                seatsZ.classList.add("is-invalid");
            }


            if (valid) {
                this.newHall.postToAPI(this);
            }
        }
    },
    mounted: function () {

    },
    computed: {}

}