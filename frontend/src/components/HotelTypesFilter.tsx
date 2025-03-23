import { hotelTypes } from "../config/hotel-options-config";

type Props = {
    selectedTypes: string[];
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const HotelTypesFilter = ({selectedTypes, onChange}: Props) =>{

    return(
        <div className="border-b border-slate-300 pb-5">
            <h2 className="font-semibold text-md mb-1">Hotel Type</h2>
            <div className="gap-2 grid grid-cols-3 lg:block lg:gap-0">
                {hotelTypes.map((type)=>(
                    <label className="flex items-center space-x-2">
                    <input 
                        type="checkbox" 
                        className="rounded" 
                        value={type} 
                        checked={selectedTypes.includes(type)}
                        onChange={onChange} 
                    />
                    <span>{type}</span>
                </label>
                ))}
            </div>
        </div>
    )
}

export default HotelTypesFilter;