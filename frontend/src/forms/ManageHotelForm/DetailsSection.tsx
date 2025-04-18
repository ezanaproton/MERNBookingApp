import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { useLocation } from "react-router-dom";
// import { useEffect } from "react";

const DetailsSection = () => {
    const {register, 
        formState: { errors }
    } = useFormContext<HotelFormData>();

    const location = useLocation();

    return(
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">{location.pathname == "/add-hotel" ? "Add Hotel" : "Edit Hotel"}</h1>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Name
                <input 
                type="text"
                className="border rounded w-full py-1 px-2 font-normal" 
                {...register("name", {required: "This field is required"})}>
                </input>
                {errors.name && (
                    <span className="text-red-500">{errors.name?.message}</span>
                )}                    
            </label>

            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input 
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("city", {required: "This field is required"})}>
                    </input>
                    {errors.name && (
                        <span className="text-red-500">{errors.city?.message}</span>
                    )}                    
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input 
                    type="text"
                    className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("country", {required: "This field is required"})}>
                    </input>
                    {errors.country && (
                        <span className="text-red-500">{errors.country?.message}</span>
                    )}                    
                </label>
            </div>

            <label className="text-gray-700 text-sm font-bold flex-1">
                Description
                <textarea 
                rows={5}
                className="border rounded w-full py-1 px-2 font-normal"
                maxLength={2000}
                {...register("description", {required: "This field is required"})}>
                </textarea>
                {errors.description && (
                    <span className="text-red-500">{errors.description?.message}</span>
                )}                    
            </label>

            <div className="flex gap-4">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Star Rating 
                    <select {...register("starRating", {required: "This field is required"})}
                        className="border rounded w-full p-2 text-gray-700 font-normal">
                        <option value="" className="text-sm font-bold">
                            Select as Rating
                        </option>
                        {[1,2,3,4,5].map((num)=>(
                            <option value={num}>{num}</option>
                        ))}
                    </select>
                    {errors.starRating && (
                        <span className="text-red-500">{errors.starRating?.message}</span>
                    )}                    
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Price Per Night
                    <input 
                    type="number"
                    min={1}
                    className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("pricePerNight", {required: "This field is required"})}>
                    </input>
                    {errors.pricePerNight && (
                        <span className="text-red-500">{errors.pricePerNight?.message}</span>
                    )}                    
                </label>
            </div>
        </div>
    )
} 

export default DetailsSection;