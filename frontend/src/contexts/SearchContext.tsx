import { createContext, ReactNode, useContext, useState } from "react";

type SearchContext = {
    destination: string;
    checkIn: Date;
    checkOut: Date;
    adultCount: number;
    childCount: number;
    hotelId?: string;
    saveSearchValues: (
        destination: string, 
        checkIn: Date, 
        checkOut: Date, 
        adultCount: number, 
        childCount: number,
    ) => void;
};

const SearchContext = createContext<SearchContext|undefined>(undefined);

type SearchContextProviderProps = {
    children: ReactNode;
}

export const SearchContextProvider = ({children}: SearchContextProviderProps) =>{
    const [destination, setDestination] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const [checkOut, setCheckOut] = useState<Date>(tomorrow);
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>();
    
    const saveSearchValues = (
        destination: string, 
        checkIn: Date, 
        checkOut: Date, 
        adultCount: number, 
        childCount: number,
        hotelId?: string
    )=>{
        setDestination(destination);
        setCheckIn(checkIn);
        setCheckOut(checkOut);
        setAdultCount(adultCount);
        setChildCount(childCount);
        if(hotelId){ setHotelId(hotelId);}
    }


    return(
    <SearchContext.Provider value={{
        destination,
        checkIn,
        checkOut,
        adultCount,
        childCount,
        hotelId,
        saveSearchValues,
    }}>
        {children}
    </SearchContext.Provider>
    )
}

export const useSearchContext = () =>{
    const context = useContext(SearchContext);
    return context as SearchContext;
}