export default class Presentation {
    uuid;
    date;
    hall;
    movie;
    reservations = [];

    constructor(uuid, date, hall, movie, reservations) {
        this.uuid = uuid;
        this.date = date;
        this.hall = hall;
        this.movie = movie;
        this.reservations = reservations;
    }
    
    toJSON() {
        let json = {
            "uuid": this.uuid,
            "date": this.date.toMillis() / 1000,
            "hall": this.hall.uuid,
            "movie": this.movie.uuid,
            "reservations": this.movie.reservations
        }
        return json;
    }
}