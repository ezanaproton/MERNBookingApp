import { KeyboardEvent, useState } from "react";

type Props = {
    selectedPrice?: number;
    onChange: (value?: number)=>void;
};

const PriceFilter = ({selectedPrice, onChange}: Props)=>{

    const [currentPrice, setCurrentPrice] = useState<number>(0);

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onChange(currentPrice);
        }
    };

    return(
        <div>
            <h4 className="text-md font-semibold mb-2"> Max Price</h4>
            <div className="flex flex-row">
                <input
                    className="w-32 border border-slate-300 rounded-md focus:outline-none"
                    type="number"
                    placeholder={"Set Max Price"}
                    defaultValue={selectedPrice}
                    max={100000}
                    min={0}
                    onChange={(event)=>setCurrentPrice(parseInt(event.target.value))}               
                    onKeyDown={handleKeyDown}
                    />
                <button 
                    className="px-2 bg-blue-600 text-white rounded-md hover:bg-blue-500"
                    onClick={()=>onChange(currentPrice)}
                >
                    Set 
                </button>
            </div>
        </div>
    )
}

export default PriceFilter;
