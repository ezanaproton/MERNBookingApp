import { useState } from "react";
import { useForm } from "react-hook-form";

type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () =>{
    const {register, watch, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();

    const onSubmit = handleSubmit((data)=>{
        console.log(data);
    })
    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("firstName", {required: "This field is required"})}>
                    </input>                    
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal" 
                    {...register("lastName", {required: "This field is required"})}></input>
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold">
                Email
                <input className="border rounded w-full py-1 px-2 font-normal" type="email"
                {...register("email", {required: "This field is required"})}></input>
            </label>
            <label className="text-gray-700 text-sm font-bold">
                Password
                <input className="border rounded w-full py-1 px-2 font-normal" type="password"
                {...register("password", {
                    required: "This field is required", 
                    minLength:{
                        value: 6,
                        message: "Password must be at least 6 characters"
                        }
                    })
                }></input>
            </label>
            <label className="text-gray-700 text-sm font-bold">
                Confirm Password
                <input 
                    className="border rounded w-full py-1 px-2 font-normal" 
                    type="password"
                    {...register("confirmPassword", {
                        validate:(val)=>{
                            if(!val){
                                return "This field is required";
                            }else if(watch("password")!==val){
                                return "Your passwords do not match";
                            }
                        }
                        })
                    }></input>
            </label>
            <span>
                <button 
                type="submit"
                className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                    Create Account
                </button>
            </span>
        </form>
    )

}

export default Register;