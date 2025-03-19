import { HotelType } from "../../backend/src/shared/types";
import { RegisterFormData } from "./pages/Register"
import { SignInFormData } from "./pages/SignIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const register = async (formData : RegisterFormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/users/register`,{
        method: "POST",
        headers:{
            "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    })

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }
};

export const signIn = async (formData: SignInFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers:{
            "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })

    const responseBody = await response.json();

    if(!response.ok){
        throw new Error(responseBody.message);
    }
    return responseBody;
}

export const validateToken = async () =>{
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: "include"
    })

    if(!response.ok){
        throw new Error("Token invalid");
    }

    return response.json();
}

export const signOut = async ()=>{
    const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });

    if(!response.ok){
        throw new Error("Error during sign out");
    }
}

export const addHotel = async (hotelFormData: FormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelFormData,
    });

    if(!response.ok){
        throw new Error("Failed to add hotel");
    }

    return response.json();
}

export const updateMyHotelById = async (hotelFormData: FormData) =>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`, {
        method: "PUT",
        credentials: "include",
        body: hotelFormData,
    });

    if(!response.ok){
        throw new Error("Failed to update hotel");
    }

    return response.json();
}

export const fetchMyHotels = async(): Promise<HotelType[]>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotels");
    }
    return response.json();
}

export const fetchMyHotelById = async(hotelId: string): Promise<HotelType>=>{
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        credentials: "include",
    })

    if(!response.ok){
        throw new Error("Error fetching hotel");
    }

    return response.json();
}