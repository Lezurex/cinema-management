export default class Reservation {
    uuid;
    presentation;
    seatX;
    seatZ;

    constructor(uuid, presentation, seatX, seatZ) {
        this.uuid = uuid;
        this.presentation = presentation;
        this.seatX = seatX;
        this.seatZ = seatZ;
    }

    toJSON() {
        return {
            "presentation": this.presentation.uuid,
            "seatX": this.seatX,
            "seatZ": this.seatZ
        }
    }
}