export default class Movie {
    uuid;
    title;
    description;
    presentations = [];

    constructor(uuid, title, description, presentations) {
        this.uuid = uuid;
        this.title = title;
        this.description = description;
        this.presentations = presentations;
    }
}