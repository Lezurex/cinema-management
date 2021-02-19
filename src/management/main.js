import Movie from "../app/objects/Movie.js";
import Presentation from "../app/objects/Presentation.js";
import Reservation from "../app/objects/Reservation.js";
import Hall from "../app/objects/Hall.js";

import navbar from "./components/Navbar.js";
import container from './components/Container.js';
import movies from './components/Movies.js';
import halls from './components/Halls.js';
import movieListElement from './components/MovieListElement.js';


const app = Vue.createApp({
    data() {
        return {
            page: "MOVIES",
            halls: [],
            movies: [],
            dataLoaded: false,
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
        }
    },
    mounted: function () {
        var that = this;
        let hallRequest = new XMLHttpRequest();
        hallRequest.open("GET", window.location.origin + "/api/halls");
        hallRequest.addEventListener("load", function (event) {
            let data = JSON.parse(hallRequest.responseText).data;
            data.forEach(hallData => {
                let newHall = new Hall(hallData.uuid, hallData.number, hallData.seatsX, hallData.seatsZ);
                that.halls.push(newHall);
            })

            let movieRequest = new XMLHttpRequest();
            movieRequest.open("GET", window.location.origin + "/api/movies");
            movieRequest.addEventListener("load", function (event) {
                if (movieRequest.status === 200) {
                    let data = JSON.parse(movieRequest.responseText).data;
                    data.forEach(movieData => {
                        let presentations = [];
                        movieData.presentations.forEach(presentationData => {
                            let presentationHall;
                            that.halls.forEach(hall => {
                                if (hall.uuid === presentationData.hall.uuid) {
                                    presentationHall = hall;
                                }
                            })
                            presentations.push(new Presentation(presentationData.uuid, DateTime.fromSeconds(presentationData.date) , presentationHall, undefined, []))
                        });
                        let newMovie = new Movie(movieData.uuid, movieData.title, movieData.description, presentations)
                        that.movies.push(newMovie);
                    });
                    that.dataLoaded = true;
                }
            });
            movieRequest.send();
        });
        hallRequest.send();
    }
});

app.component("navbar", navbar);
app.component("container", container);
app.component("movies", movies);
app.component("halls", halls);
app.component("movieListElement", movieListElement)

const mountedApp = app.mount("#app");