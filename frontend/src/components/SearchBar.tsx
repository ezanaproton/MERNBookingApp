import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";
import {isBefore, isAfter, addDays, subDays, startOfDay}  from "date-fns";


const SearchBar = () => {
    const search = useSearchContext();

    const navigate = useNavigate();

    const [destination, setDestination] = useState<string>(search.destination);
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);
    const [childCount, setChildCount] = useState<number>(search.childCount);

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        search.saveSearchValues(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        );
        navigate("/search");
    };

    const minCheckInDate = new Date();
    const maxCheckInDate = new Date();
    maxCheckInDate.setFullYear(minCheckInDate.getFullYear() + 1);

    const minCheckOutDate = new Date();
    minCheckOutDate.setDate(minCheckInDate.getDate() + 1);
    const maxCheckOutDate = new Date();
    maxCheckOutDate.setFullYear(maxCheckInDate.getFullYear());

    const handleClear = () => {
        setDestination("");
        const x = new Date();
        setCheckIn(x);
        setCheckOut(new Date(addDays(new Date(), 1)));
        setAdultCount(1);
        setChildCount(0);
    };

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-[2fr_2fr_3fr_2fr] items-center gap-4">
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <div className=" items-center flex flex-row gap-1">
                <div className="flex flex-row flex-1 bg-white py-1 px-2">
                    <span className="pt-1">Adults:</span> <input className="w-full p-1 focus:outline-none font-semibold"
                                type="number"
                                min={1}
                                max={20}
                                value={adultCount}
                                onChange={(event) => setAdultCount(parseInt(event.target.value))}
                            />
                </div>
                <div className="flex flex-row flex-1 bg-white py-1 px-2">
                    <span className="pt-1">Children:</span> <input className="w-full p-1 focus:outline-none font-semibold"
                                type="number"
                                min={0}
                                max={20}
                                value={childCount}
                                onChange={(event) => setChildCount(parseInt(event.target.value))}
                            />
                </div>
            </div>
            <div className="flex flex-row gap-1 col-span-1">
                <div className="flex-1 flex flex-row">
                    <span className="pt-2 bg-white pl-2 flex-1">From:</span>
                    <DatePicker
                        selected={checkIn}
                        onChange={(checkInDate) => {
                            setCheckIn(checkInDate as Date);
                            if (checkInDate) {
                                if ( !isBefore(checkInDate, startOfDay(checkOut))) {
                                    setCheckOut(addDays(checkInDate, 1));
                                };
                            }
                        }}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minCheckInDate}
                        maxDate={maxCheckInDate}
                        placeholderText="Check-in Date"
                        className="w-full bg-white p-2 focus:outline-none font-semibold"
                    />
                </div>
                <div className="flex-1 flex flex-row">
                    <span className="pt-2 bg-white pl-2 flex-1">To:</span>
                    <DatePicker
                        selected={checkOut}
                        onChange={(checkOutDate) => {
                            setCheckOut(checkOutDate as Date);

                            if (checkOutDate) {
                                if (isAfter(checkIn, startOfDay(checkOutDate))){
                                    setCheckIn(subDays(checkOutDate, 1));
                                };
                            }
                        }}
                        selectsStart
                        startDate={checkIn}
                        endDate={checkOut}
                        minDate={minCheckOutDate}
                        maxDate={maxCheckOutDate}
                        placeholderText="Check-out Date"
                        className="w-full bg-white p-2 focus:outline-none font-semibold"
                    />
                </div>
            </div>
            <div className="flex gap-1 ">
                <button className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500"
                onClick={handleSubmit}>
                    Search
                </button>
                <button className="w-1/3 bg-red-400 text-white h-full p-2 font-bold text-xl hover:bg-red-300"
                onClick={handleClear}>
                    Clear
                </button>
            </div>
        </form>
    )
}

export default SearchBar;