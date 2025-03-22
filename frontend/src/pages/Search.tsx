import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../client";
import { useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";

const Search = ()=>{
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString()
    }

    const {data: hotelData } = useQuery(["searchHotels", searchParams], 
        ()=>apiClient.searchHotels(searchParams)
    );
    return(
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit top-10 lg:sticky">
                <span>Filter</span>
            </div>
            <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                    {hotelData?.pagination.total} Hotels found
                    {search.destination ? ` in ${search.destination}` : ""}
                </span>
                {/* <select
                    value={sortOption}
                    onChange={(event) => setSortOption(event.target.value)}
                    className="p-2 border rounded-md"
                >
                    <option value="">Sort By</option>
                    <option value="starRating">Star Rating</option>
                    <option value="pricePerNightAsc">
                    Price Per Night (low to high)
                    </option>
                    <option value="pricePerNightDesc">
                    Price Per Night (high to low)
                    </option>
                </select> */}
            </div>

                <Pagination
                    page={hotelData?.pagination.page || 1}
                    pages={hotelData?.pagination.pages || 1}
                    onChange={(x)=>setPage(x)}
                />

                {hotelData?.data.map((hotel)=>(
                    <SearchResultsCard hotel={hotel}/>
                ))}

                <Pagination
                page={hotelData?.pagination.page || 1}
                pages={hotelData?.pagination.pages || 1}
                onChange={(x)=>setPage(x)}/>
            </div>
        </div>
    )
}

export default Search;