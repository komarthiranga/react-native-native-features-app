import { useEffect, useState } from "react";
import PlaceList from "../components/Places/PlaceList";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../utils/database";
const AllPlaces = () => {
    const isFocused = useIsFocused();
    const [loadedPlaces, setLoadedPlaces] = useState([]);
    
    useEffect( () => {
        if(isFocused) {
            fetchPlacesHandler();
        }
    }, [isFocused])

    const fetchPlacesHandler = async() => {
        const places =  await fetchPlaces();
        setLoadedPlaces(places)
    }   

    return <PlaceList places={loadedPlaces} />
}

export default AllPlaces;