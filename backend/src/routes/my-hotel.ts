import express, { Request, Response }  from "express"
import multer from "multer";
import cloudinary from "cloudinary";
import Hotel from "../models/hotel";
import { HotelType } from "../shared/types"
import verifyToken from "../middleware/auth";
import { body } from "express-validator";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits:{
        fileSize: 5 * 1024 * 1024 // 5MB 
    }
})

router.post("/", 
    verifyToken, [
        body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage('City is required'),
        body("country").notEmpty().withMessage('Country is required'),
        body("description").notEmpty().withMessage('Description is required'),
        body("type").notEmpty().withMessage('Hotel type is required'),
        body("pricePerNight").notEmpty().isNumeric().withMessage('Price Per Night is required'),
        body("facilities").notEmpty().isArray().withMessage('Facilities is required'),
    ],
    upload.array("imageFiles", 6), 
    async (req: Request, res: Response)=>{
    // if hotel not in response body: res 400
    // if hotel: process response body into hotel object
    
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const imageUrls = await uploadImages(imageFiles);
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (e){
        console.log("Error creating hotel: ", e);
        res.status(500).json({message: "Something went wrong"});
    }
})

router.get('/', verifyToken, async (req : Request, res : Response)=>{
    try{
        const hotels = await Hotel.find({userId: req.userId});
        res.json(hotels);    
    }catch(error){
        res.status(500).json({message: "Error fetching Hotels"});
    }
})

router.get('/:id', 
    verifyToken, 
    async (req : Request, res : Response)=>{
    const id = req.params.id.toString();
    try{
        const hotel = await Hotel.findOne({_id: id});
        console.log(hotel);
        res.json(hotel);    
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Error fetching Hotel"});
    }
})

router.put('/:id', 
    verifyToken, 
    [
        body("name").notEmpty().withMessage('Name is required'),
        body("city").notEmpty().withMessage('City is required'),
        body("country").notEmpty().withMessage('Country is required'),
        body("description").notEmpty().withMessage('Description is required'),
        body("type").notEmpty().withMessage('Hotel type is required'),
        body("pricePerNight").notEmpty().isNumeric().withMessage('Price Per Night is required'),
        body("facilities").notEmpty().isArray().withMessage('Facilities is required'),
    ],
    upload.array("imageFiles", 6), 
    async (req : Request, res : Response)=>{
        try{
            const id = req.params.id;

            const updatedHotel : HotelType = req.body;
            
            if(req.files){
                const imageFiles = req.files as Express.Multer.File[];
                const imageUrls = await uploadImages(imageFiles);                   
                updatedHotel.imageUrls = updatedHotel.imageUrls ? updatedHotel.imageUrls.concat(imageUrls) : imageUrls;
                // console.log(updatedHotel.imageUrls);    
            }
            updatedHotel.lastUpdated = new Date();
            // console.log(updatedHotel);

            const hotel = await Hotel.findOneAndUpdate({_id: id, userId: req.userId}, updatedHotel, { new: true });
            // console.log(hotel);
            if(!hotel){
                return res.status(404).json({message:"Hotel not found"});
            }

            res.status(201).json(hotel);

        } catch (error) {
            console.log("Error updating hotel: ", error);
            res.status(500).json({message: "Something went wrong"});
        }
})

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    // console.log(imageUrls);
    return imageUrls;
}

export default router;