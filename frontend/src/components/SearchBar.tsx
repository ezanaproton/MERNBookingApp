import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { useNavigate } from "react-router-dom";


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
        setCheckIn(new Date());
        setCheckOut(new Date(new Date().setDate(new Date().getDate() + 1)));
        setAdultCount(1);
        setChildCount(0);
    };

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={25} className="mr-2" />
                <input
                    placeholder="Where are you going?"
                    className="text-md w-full focus:outline-none"
                    value={destination}
                    onChange={(event) => setDestination(event.target.value)}
                />
            </div>

            <div className="flex bg-white px-2 py-1 gap-2">
                <label className="items-center flex">
                    Adults:
                    <input className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={1}
                        max={20}
                        value={adultCount}
                        onChange={(event) => setAdultCount(parseInt(event.target.value))}
                    />

                    Children:
                    <input className="w-full p-1 focus:outline-none font-bold"
                        type="number"
                        min={0}
                        max={20}
                        value={childCount}
                        onChange={(event) => setChildCount(parseInt(event.target.value))}
                    />
                </label>
            </div>
            <div className="flex flex-row gap-4 col-span-2">
                <DatePicker
                    selected={checkIn}
                    onChange={(checkInDate) => {
                        setCheckIn(checkInDate as Date);
                        const newDate = new Date();
                        if (checkInDate) {
                            if (checkOut <= checkInDate) {
                                newDate.setDate(checkInDate.getDate() + 1);
                                setCheckOut(newDate);
                            };
                        }
                    }}
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minCheckInDate}
                    maxDate={maxCheckInDate}
                    // placeholderText="Check-in Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="flex-1"
                />
                <DatePicker
                    selected={checkOut}
                    onChange={(checkOutDate) => {
                        setCheckOut(checkOutDate as Date);
                        const newDate = new Date();

                        if (checkOutDate) {
                            if (checkIn >= checkOutDate) {
                                newDate.setDate(checkOutDate.getDate() - 1);
                                setCheckIn(newDate);
                            };
                        }
                    }
                    }
                    selectsStart
                    startDate={checkIn}
                    endDate={checkOut}
                    minDate={minCheckOutDate}
                    maxDate={maxCheckOutDate}
                    // placeholderText="Check-out Date"
                    className="min-w-full bg-white p-2 focus:outline-none"
                    wrapperClassName="flex-1"
                />
            </div>
            <div className="flex gap-1">
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