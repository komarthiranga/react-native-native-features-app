import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from '../utils/database'
const AddPlace = ({navigation}) => {
    const createPlaceHandler = async(place) => {
        await insertPlace({...place, lat: place.location.lat, lng: place.location.lng })
        navigation.navigate("AllPlaces")
    }
    return (
        <PlaceForm onAddPlace={createPlaceHandler} />
    )
}

export default AddPlace;

