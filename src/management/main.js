import Movie from "./objects/Movie.js";
import Presentation from "./objects/Presentation.js";
import Reservation from "./objects/Reservation.js";
import Hall from "./objects/Hall.js";

import navbar from "./components/Navbar.js";
import container from './components/Container.js';
import movies from './components/Movies.js';

const app = Vue.createApp({
    data() {
        return {
            page: "MOVIES",
            halls: [
                new Hall("a", 1, 10, 10),
                new Hall("a", 2, 12, 12)
            ],
            movies: [
                new Movie("a", "Test Movie", "Lorem ipsum dolor sit amet", [
                    new Presentation("a", 12780000, new Hall("a", 1, 10, 10), this, [
                        new Reservation("a", this, 1, 1)
                    ])
                ])
            ]
        }
    },
    methods: {
        changePage(page) {
            this.page = page;
        }
    }
});

app.component("navbar", navbar);
app.component("container", container);
app.component("movies", movies);

const mountedApp = app.mount("#app");