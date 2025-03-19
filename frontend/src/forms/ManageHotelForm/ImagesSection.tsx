import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm"
import { ChangeEvent, useState} from "react"; // Import ChangeEvent
// import { HotelType } from "../../../../backend/src/shared/types";


const ImagesSection = () => {
    const {
        register, 
        formState: {errors}, 
        watch,
        setValue
    } = useFormContext<HotelFormData>();

    const existingImageUrls = watch("imageUrls");
    const [filesSelected, setFilesSelected] = useState(false);

    const handleInput=(event: ChangeEvent<HTMLInputElement>) =>{
        if(event.target.files!==null && event.target.files.length > 0){
            const imageURLS = Array.from(event.target.files).map((file)=>(URL.createObjectURL(file)));
            const updatedUrls = existingImageUrls ? imageURLS.concat(existingImageUrls): imageURLS;
            setValue("imageUrls", updatedUrls);
            setFilesSelected(true);
            // console.log(updatedUrls);
        }
        else{
            setFilesSelected(false);
            const updatedImageUrls = existingImageUrls.filter((url)=>url.includes("res.cloudinary.com"));
            setValue("imageUrls",  updatedImageUrls);
        }
        console.log(event.target.files);
    }

    const handleDelete = (index: number) => {
        const updatedImageUrls = existingImageUrls.toSpliced(index, 1);
        setValue("imageUrls",  updatedImageUrls);
        if(!updatedImageUrls.some((url)=>url.includes("blob"))){
            setFilesSelected(false);
        }
    };

    return(
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>
            <div className="border rounded p-4 flex flex-col gap-4">
                <input
                    type="file"
                    multiple
                    accept="image/*"
                    className="w-full text-gray-700 font-normal cursor-pointer"
                    {...register("imageFiles", {
                        validate: (imageFiles)=>{
                            const totalLength = imageFiles.length + (existingImageUrls?.length || 0);

                            if(totalLength===0){
                                return "At least one image should be added";
                            }

                            if(totalLength>6){
                                return "Total number of images cannot be more than 6";
                            }
                        }
                    })}
                    onChange={handleInput}
                    ></input>
                    {existingImageUrls && existingImageUrls.some((url)=>url.includes("res.cloudinary.com")) &&
                    <>
                    <h3>Current Images</h3>
                    <div className="grid grid-cols-3 gap-1">
                    {existingImageUrls.map((url, index)=> url?.includes("res.cloudinary.com") && (
                        <div className="group relative">
                            
                            <img src={`${url}`} className="object-cover min-w-full align-middle"/>
                            <button 
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 text-white"
                              onClick={() => handleDelete(index)}
                            >
                                Delete
                            </button>
                        </div>
                        ))}
                    </div>
                    </>}
                    {filesSelected && 
                    <>
                    <h3>New Images</h3> 
                    <div className="grid grid-cols-3 gap-1">
                     {existingImageUrls.map((url, index)=> !url?.includes("res.cloudinary.com") && (
                        <div className="group relative">
                            <img src={`${url}`} className="object-cover min-w-full align-middle"/>
                            <button 
                              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 text-white"
                              onClick={() => handleDelete(index)}
                            >
                                Delete
                            </button>
                        </div>
                        ))}
                    </div>
                    </>
                    }
            </div>
            {errors.imageFiles && <span className="text-red-500 text-sm font-bold">{errors.imageFiles.message}</span>}
        </div>
    )
}

export default ImagesSection