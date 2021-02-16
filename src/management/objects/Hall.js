export default class Hall {
    uuid;
    number;
    seatsX;
    seatsZ;

    constructor(uuid, number, seatsX, seatsZ) {
        this.uuid = uuid;
        this.number = number;
        this.seatsX = seatsX;
        this.seatsZ = seatsZ;
    }
}