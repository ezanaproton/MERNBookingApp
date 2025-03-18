import { useQuery } from "react-query";
import * as apiClient from "../client"
import HotelCard from "../components/HotelCard";
import { Link } from "react-router-dom";

const MyHotels = () =>{

    const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels, {
        onError: () => {},
    })

    if(!hotelData){
        return (<span> No Hotels found</span>);
    }
    return(
        <div className="space-y-5">
            <span className="flex justify-between">
                <h1 className="font-bold text-3xl">My Hotels</h1>
                <Link to={'/add-hotel'} className="flex bg-blue-600 text-white font-bold text-xl p-2 hover:bg-blue-500">Add Hotel</Link>
            </span>
            {!hotelData 
                ? <span> No Hotels found</span>
                : (<div className="grid grid-cols-1 gap-8">
                    {hotelData.map((hotel) => (
                        <HotelCard {...hotel}/>
                    ))}
                </div>)
            }
        </div>    
    )
}

export default MyHotels