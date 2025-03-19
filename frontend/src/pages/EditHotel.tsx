import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import * as apiClient from "../client";
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm";
import { useAppContext } from "../contexts/AppContext";

const EditHotel = () =>{
    const { hotelId } = useParams();

    const { data: hotel } = useQuery("fetchMyHotelById", 
        () => apiClient.fetchMyHotelById(hotelId || ""),
        {
            enabled: !!hotelId,
        }
    )

    const navigate = useNavigate();

    const {showToast} = useAppContext();

    const { mutate, isLoading } = useMutation( apiClient.updateMyHotelById
        ,{
        onSuccess: () => {
            showToast({ message: "Hotel Updated!", type: "SUCCESS" });
            navigate("/my-hotels")
        },
        onError: () => {
            showToast({ message: "Error Updating Hotel", type: "ERROR" });
        },
    });   
    
    const handleSave = (hotelFormData: FormData)=>{
        mutate(hotelFormData);
        
    }
        
    return(
        <div>
            <ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={hotel}/>
        </div>
    )
}
export default EditHotel;