import express, {Request, Response} from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const router = express.Router();

router.post("/login", [
    check("email", "Email is required.").isEmail(),
    check("password", "Password with 6 or more characters is required.").isLength({min: 6,}),
], async (req : Request, res: Response) : Promise<any>=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors.array()})
    }

    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "PRODUCTION",
            maxAge: 86400000,
        });
        return res.status(200).json({ message: "Logged In Successfully!" });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: "Something went wrong!" });
    }
});

export default router;

