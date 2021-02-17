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
                this.toJSON()
            ]
        }
        request.addEventListener("load", function (event) {
            if (request.status === 200) {
                component.movies.add(this);
                component.newMovie = new Movie();
            }
        })
        request.send(JSON.stringify(json));
    }

    toJSON() {
        let json = {
            "uuid": this.uuid,
            "title": this.title,
            "description": this.description
        }
        json.presentations = [];
        for (let presentation in this.presentations) {
            let jsonFriendly = presentation.toJSON();
            json.presentations.add(jsonFriendly);
        }
        return json;
    }
}