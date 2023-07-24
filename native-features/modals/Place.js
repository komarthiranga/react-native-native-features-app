
export class Place {
    constructor(title, imageUri, location, id) {
        this.title = title;
        this.location = {lat: location.lat, lng: location.lng};
        this.imageUri = imageUri;
        this.address = location.address;
        this.id = id;
    }
}