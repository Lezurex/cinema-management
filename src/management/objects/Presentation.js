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
    
    toJSON(component = null) {
        if (component !== null) {
            let halls = component.halls;
            halls.forEach(hall => {
                if (hall.uuid === this.hall) {
                    this.hall = hall;
                }
            })
        }
        let json = {
            "uuid": this.uuid,
            "date": DateTime.fromString(this.date, "yyyy-LL-dd'T'HH:mm").toMillis() / 1000,
            "hall": this.hall.uuid,
            "movie": this.movie.uuid,
            "reservations": this.movie.reservations
        };
        console.log(json);
        return json;
    }
}