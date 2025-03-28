import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../client";
import { useDeferredValue, useEffect, useState } from "react";
import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/FacilitiesFilter";
import PriceFilter from "../components/PriceFilter";


const Search = ()=>{
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [pages, setPages] = useState<number>(1);
    const deferredPages = useDeferredValue(pages);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number|undefined>(undefined);

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(),
        childCount: search.childCount.toString(),
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString()
    }

    const {data: hotelData } = useQuery(["searchHotels", searchParams], 
        ()=>apiClient.searchHotels(searchParams)
    );

    const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
        const starRating = event.target.value

        setSelectedStars((prevStars) =>
            event.target.checked
                ? [...prevStars, starRating]
                : selectedStars.filter((star)=>star!==starRating)
        )
        setPage(1);
    }

    const handleHotelTypeChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const hotelType = event.target.value;
    
        setSelectedHotelTypes((prevHotelTypes) =>
          event.target.checked
            ? [...prevHotelTypes, hotelType]
            : prevHotelTypes.filter((hotel) => hotel !== hotelType)
        );
        setPage(1);
      };

      const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const facility = event.target.value;
    
        setSelectedFacilities((prevFacilities) =>
          event.target.checked
            ? [...prevFacilities, facility]
            : prevFacilities.filter((prevFacility) => prevFacility !== facility)
        );
        setPage(1);
      };

      const handleMaxPriceChange = (maxPrice?: number) =>{
        setSelectedPrice(maxPrice||1000000000);
        setPage(1);
      }
    
      useEffect(()=>{
        if(hotelData){
            setPages(hotelData.pagination.pages);
        }
      },[hotelData])

    return(
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit top-10 lg:sticky lg:max-h-[calc(100vh-5rem)] overflow-y-auto">                
                <div className="space-y-5 ">
                    <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter By:</h3>
                    <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>
                    <HotelTypesFilter selectedTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
                    <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange}/>
                    <PriceFilter selectedPrice={selectedPrice} onChange={handleMaxPriceChange}/>
                </div>
            </div>
            <div className="flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <span className="text-xl font-bold">
                    {hotelData?.pagination.total || 0} Hotels found
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

                {hotelData 
                    && pages >1 
                    && <div className="-mt-12">
                            <Pagination
                                page={page}
                                pages={deferredPages}
                                onChange={(x)=>setPage(x)}
                            />
                        </div>
                }

                {hotelData?.data.map((hotel)=>(
                    <SearchResultsCard hotel={hotel}/>
                ))}

                {hotelData && pages >1 &&<Pagination
                    page={page}
                    pages={deferredPages}
                    onChange={(x)=>setPage(x)}/>
                }
            </div>
        </div>
    )
}

export default Search;