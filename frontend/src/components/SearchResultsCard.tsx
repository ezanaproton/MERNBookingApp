import { AiFillStar } from "react-icons/ai"
import { HotelType } from "../../../backend/src/shared/types"
import { useState } from "react"
import { Link } from "react-router-dom"

type Props = {
    hotel: HotelType
}



const SearchResultsCard = ({hotel}:Props) =>{

    const [allFacilities, setAllFacilities] = useState(false);
    return(
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-300 rounded-lg p-6 gap-6 f">
            <div className="w-full h-[300px]">
                <img
                src={hotel.imageUrls[0]}
                className="w-full h-full object-cover object-center rounded-lg"
                />
            </div>
            <div className="grid grid-rows-[2fr_4fr_3fr]">
                <div>
                    <Link to={`/detail/${hotel._id}`}>
                        <h2 className="text-bold text-2xl">{hotel.name}</h2>
                    </Link>
                    <div className="flex items-center">
                        <span className="flex">
                        {Array.from({ length: hotel.starRating }).map(() => (
                            <AiFillStar className="fill-yellow-400" />
                        ))}
                        </span>
                        <span className="ml-1 text-sm">{hotel.type}</span>
                    </div>
                </div>
                <div>
                    <div className="line-clamp-6">{hotel.description}</div>
                </div>
                <div className="grid grid-cols-[4fr_1fr] items-end whitespace-nowrap">
                    <div className="flex gap-1 items-center flex-wrap">
                        {!allFacilities ? hotel.facilities.slice(0, 3).map((facility) => (
                        <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                            {facility}
                        </span>
                        )):
                        hotel.facilities.map((facility) => (
                            <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                                {facility}
                            </span>
                            ))
                        }
                        {hotel.facilities.length > 3 && !allFacilities &&
                            <button className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap cursor-pointer"
                            onClick={()=>setAllFacilities(true)}>
                                {`+${hotel.facilities.length - 3} more`}
                            </button>
                            }
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="font-bold">£{hotel.pricePerNight} per night</span>
                        <Link
                        to={`/detail/${hotel._id}`}
                        className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit hover:bg-blue-500"
                        >
                        View More
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default SearchResultsCard