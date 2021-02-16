export default class Presentation {
    uuid;
    time;
    hall;
    movie;
    reservations = [];

    constructor(uuid, time, hall, movie, reservations) {
        this.uuid = uuid;
        this.time = time;
        this.hall = hall;
        this.movie = movie;
        this.reservations = reservations;
    }
}