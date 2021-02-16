const app = Vue.createApp({
    data() {
        return {
            page: "MOVIES",
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

    }
})