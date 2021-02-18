import Movie from "../app/objects/Movie.js";
import Presentation from "../app/objects/Presentation.js";
import Reservation from "../app/objects/Reservation.js";
import Hall from "../app/objects/Hall.js";

import navbar from "./components/Navbar.js";
import container from './components/Container.js';
import movies from './components/Movies.js';
import halls from './components/Halls.js';


const app = Vue.createApp({
    data() {
        return {
            page: "MOVIES",
            halls: null,
            movies: []
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
        }
    },
    mounted: function () {
        // get Halls
        let that = this;
        let request = new XMLHttpRequest();
        request.open("GET", window.location.origin + "/api/halls");
        request.addEventListener("load", function (event) {
            that.halls = [];
            let json = JSON.parse(request.responseText);
            if (json.data.length > 0) {
                json.data.forEach(hallObject => {
                    let hall = new Hall(hallObject.uuid, hallObject.number, hallObject.seatsX, hallObject.seatsZ);
                    that.halls.push(hall);
                });
            }
        })
        request.send();
    }
});

app.component("navbar", navbar);
app.component("container", container);
app.component("movies", movies);
app.component("halls", halls);

const mountedApp = app.mount("#app");