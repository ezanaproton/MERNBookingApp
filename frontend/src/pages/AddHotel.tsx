// import * as x from 'react-hook-form'
import { useMutation } from "react-query";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import * as apiClient from "../client";
import { useAppContext } from "../contexts/AppContext";

const AddHotel = () => {
    const {showToast} = useAppContext()
    const {mutate, isLoading} = useMutation(apiClient.addHotel, {
        onSuccess: ()=>{
            showToast({message: "Hotel Saved!", type: "SUCCESS"});
        },
        onError: ()=>{
            showToast({message: "Error Saving Hotel", type: "ERROR"});
        }
    });    

    const handleSave = (hotelFormData: FormData)=>{
        mutate(hotelFormData);
    }

    return(
        <ManageHotelForm onSave={handleSave} isLoading={isLoading}/>
    )
}

export default AddHotel;