// import * as apiClient from "../client"
// import HotelCard, { HotelType } from "../components/HotelCard";
import { Link } from "react-router-dom";
// import react from "react";

const MyHotels = () =>{
    // const hotelsObject:HotelType = apiClient.getHotels();

    return(
        <div>
            <Link to={'/add-hotel'}>Add a Hotel</Link>
            {/* {hotelsObject.map((hotel:HotelType)=>(<HotelCard hotel={hotel}/>))} */}
            {/* <HotelCard hotel={hotelsObject[0]}/> */}
        </div>    
    )
}

export default MyHotels