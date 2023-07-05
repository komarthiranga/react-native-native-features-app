
class Place {
    constructor(title, address, imageUri, location) {
        this.title = title;
        this.location = location;
        this.imageUri = imageUri;
        this.address = address;
        this.id = new Date().toString() + Math.random().toString();
    }
}