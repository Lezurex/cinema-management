import Header from './components/Header.js';
import MovieOverview from './components/MovieOverview.js'
import Movie from "./objects/Movie.js";
import Presentation from "./objects/Presentation.js";
import Hall from "./objects/Hall.js";

const app = Vue.createApp({
    data() {
        return {
            dataLoaded: false,
            movies: [],
            halls: [],
            currentMovie: null
        }
    },
    template: `
        <top v-if="dataLoaded"></top>
        <movieOverview :movies="movies"></movieOverview>
        <movieDetails :currentMovie="currentMovie"></movieDetails>
    `,
    methods: {

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

app.component("top", Header)
app.component("movieOverview", MovieOverview)

const mountedApp = app.mount("#app");