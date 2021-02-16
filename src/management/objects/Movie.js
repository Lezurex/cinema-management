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

    setTitle(value) {
        this.title = value;
    }

    setDescription(value) {
        this.description = value;
    }
}