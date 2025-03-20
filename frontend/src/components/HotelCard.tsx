import { HotelType } from "../../../backend/src/shared/types";
import { Link } from "react-router-dom";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";

const HotelCard = (hotel: HotelType)=>{
    return(
        <div
        data-testid="hotel-card"
        className="flex flex-col justify-between border border-slate-300 rounded-lg p-8 gap-5"
    >
        <h2 className="text-2xl font-bold">{hotel.name}</h2>
        <div className="grid gap-3 grid-cols-3" >
            {hotel.imageUrls?.map((url)=>(
                <img src={url} className="min-w-28 min-h-full"/>
            ))}
        </div>
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="flex flex-wrap gap-2">
        <div className="border border-slate-300 rounded-4xl p-3 flex items-center">
            <BsMap className="mr-1" />
            {hotel.city}, {hotel.country}
        </div>
        <div className="border border-slate-300 rounded-4xl p-3 flex items-center">
            <BsBuilding className="mr-1" />
            {hotel.type}
        </div>
        <div className="border border-slate-300 rounded-4xl p-3 flex items-center">
            <BiMoney className="mr-1" />£{hotel.pricePerNight} per night
        </div>
        <div className="border border-slate-300 rounded-4xl p-3 flex items-center">
            <BiHotel className="mr-1" />
            {hotel.adultCount} {hotel.adultCount === 1 ? "adult" : "adults"}, {hotel.childCount} {hotel.childCount === 1 ? "child" : "children"}
        </div>
        <div className="border border-slate-300 rounded-4xl p-3 flex items-center">
            <BiStar className="mr-1" />
            {hotel.starRating} Star Rating
        </div>
        </div>
        <span className="flex justify-end">
        <Link
            to={`/edit-hotel/${hotel._id}`}
            className="flex bg-blue-600 text-white text-xl font-bold p-2 hover:bg-blue-500 rounded-xl"
        >
            View Details
        </Link>
        </span>
    </div>
    )
}

export default HotelCard;