import Header from './components/Header.js';
import MovieOverview from './components/MovieOverview.js'
import Movie from "./objects/Movie.js";
import Presentation from "./objects/Presentation.js";
import Hall from "./objects/Hall.js";
import MovieDetails from "./components/MovieDetails.js";
import PresentationDetails from "./components/PresentationDetails.js";
import Reservation from "./objects/Reservation.js";

const app = Vue.createApp({
    data() {
        return {
            currentPage: "OVERVIEW",
            dataLoaded: false,
            movies: [],
            halls: [],
            currentMovie: null,
            currentPresentaion: null
        }
    },
    template: `
        <top v-if="dataLoaded"></top>
        <movieOverview v-if="currentPage === 'OVERVIEW'" @openmovie="openMovie" :movies="movies"></movieOverview>
        <movieDetails @reserveseat="reserveSeat" @back="currentPage = 'OVERVIEW'" v-if="currentPage === 'MOVIEDETAILS'" :currentMovie="currentMovie"></movieDetails>
        <presentationDetails @back="backToMovie" :currentMovie="currentMovie" :currentPresentation="currentPresentaion" v-if="currentPage === 'PRESENTATION'"></presentationDetails>
    `,
    methods: {
        openMovie(movie) {
            this.currentMovie = movie;
            this.currentPage = "MOVIEDETAILS";
        },
        reserveSeat(presentation) {
            let that = this;
            let request = new XMLHttpRequest();
            request.open("GET", window.location.origin + "/api/reservations/fromPresentation/" + presentation.uuid);
            request.addEventListener("load", function () {
                let data = JSON.parse(request.responseText).data;
                presentation.reservations = [];
                data.forEach(reservationData => {
                    let newReservation = new Reservation(reservationData.uuid, presentation, reservationData.seatX, reservationData.seatZ);
                    presentation.reservations.push(newReservation);
                })

                that.currentPresentaion = presentation;
                that.currentPage = "PRESENTATION";
            })
            request.send();
        },
        backToMovie() {
            this.currentPage = "MOVIEDETAILS";
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

app.component("top", Header)
app.component("movieOverview", MovieOverview)
app.component("movieDetails", MovieDetails)
app.component("presentationDetails", PresentationDetails)

const mountedApp = app.mount("#app");