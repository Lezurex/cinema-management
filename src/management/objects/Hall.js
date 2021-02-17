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

    postToAPI(component) {
        let request = new XMLHttpRequest();
        request.open("POST", window.location.origin + "/api/halls");
        let json = {
            "data": [
                this.toJSON(component)
            ]
        }
        request.addEventListener("load", function (event) {
            if (request.status === 200) {
                let json = JSON.parse(request.responseText);
                let hallData = json.data[0];
                let newHall = new Hall(hallData.uuid, hallData.number, hallData.seatsX, hallData.seatsZ);
                component.halls.push(newHall);
                component.newHall = new Hall();
            }
        })
        request.send(JSON.stringify(json));
    }

    toJSON() {
        return {
            "number": this.number,
            "seatsX": this.seatsX,
            "seatsZ": this.seatsZ
        }
    }
}