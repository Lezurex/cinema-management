import Presentation from "./Presentation.js";
import Hall from "./Hall.js";

export default class Movie {
    uuid;
    title;
    description;
    presentations = [];

    constructor(uuid, title, description, presentations) {
        this.uuid = uuid;
        this.presentations = presentations;
        this.title = title;
        this.description = description;
    }

    postToAPI(component) {
        let request = new XMLHttpRequest();
        request.open("POST", window.location.origin + "/api/movies");
        let json = {
            "data": [
                this.toJSON(component)
            ]
        }
        request.addEventListener("load", function (event) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                let movieData = json.data[0];
                let newMovie = new Movie(movieData.uuid, movieData.title, movieData.description, []);
                movieData.presentations.forEach(presentationData => {
                    let mentionedHall = null;
                    component.halls.forEach(hall => {
                        if (hall.uuid === presentationData.hall.uuid) {
                            mentionedHall = hall;
                        } else {
                            let hallData = presentationData.hall;
                            mentionedHall = new Hall(hallData.uuid, hallData.number, hallData.seatsX, hallData.seatsZ);
                        }
                    })
                    let newPresentation = new Presentation(presentationData.uuid, DateTime.fromMillis(presentationData.date * 1000), mentionedHall, newMovie, []);
                    newMovie.presentations.push(newPresentation);
                });
                component.movies.push(newMovie);
                component.newMovie = new Movie();
            }
        })
        request.send(JSON.stringify(json));
    }

    toJSON(component = null) {
        let json = {
            "uuid": this.uuid,
            "title": this.title,
            "description": this.description
        }
        json.presentations = [];
        this.presentations.forEach(presentation => {
            let jsonFriendly = presentation.toJSON(component);
            json.presentations.push(jsonFriendly);
        });
        return json;
    }
}