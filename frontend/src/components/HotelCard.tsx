
export type HotelType = {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}

const HotelCard = (hotel: HotelType)=>{
    <div className="flex flex-row">
        <span>{hotel.name}</span>
        <span>{hotel.city}</span>
        <span>{hotel.country}</span>
        <span>{hotel.pricePerNight}</span>
    </div>

}

export default HotelCard;