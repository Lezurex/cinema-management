import Presentation from "../objects/Presentation.js";
import Movie from "../objects/Movie.js";
import Reservation from "../objects/Reservation.js";

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
        <table class="table align-middle" v-if="currentPresentation.reservations" id="reservation-table">
          <thead>
            
          </thead>
          <tbody>
            <tr>
              <th class="table-secondary">Seats</th>
              <th class="table-secondary" v-for="x in currentPresentation.hall.seatsX">{{x}}</th>
            </tr>
            <tr v-for="z in currentPresentation.hall.seatsZ">
              <th class="table-secondary">{{z}}</th>
              <td class="td-no-padding" v-for="x in currentPresentation.hall.seatsX">
                <div v-if="getSeatStatus(x, z)" @click="reserveSeat(x, z)" class="seat-free">Free</div>
                <div v-else class="seat-occupied">Reserved</div>
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
    methods: {
        back() {
            this.$emit("back");
        },
        getSeatStatus(x, z) {
            let match = false;
            this.currentPresentation.reservations.forEach(reservation => {
                if (reservation.seatX === x && reservation.seatZ === z) {
                    match = true;
                }
            })
            return !match;
        },
        reserveSeat(x, z) {
            let that = this;
            let request = new XMLHttpRequest();
            request.open("POST", window.location.origin + "/api/reservations/");
            let newReservation = new Reservation(undefined, this.currentPresentation, x, z);
            let body = JSON.stringify({
                "data": [
                    newReservation.toJSON()
                ]
            });
            request.addEventListener("load", function (event) {
                if (request.status === 200) {
                    that.$emit("reserveseat", that.currentPresentation);
                }
            });
            request.send(body);
        }
    },
    mounted: function () {
        console.log(this.currentPresentation)
    }

}