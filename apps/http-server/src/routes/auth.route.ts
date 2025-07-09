import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWTSecret } from "@repo/backend-common/config";
import { prismaClient } from "@repo/postgresdb/prismaClient";

const authRoute: Router = Router();

authRoute.post("/signup", async (req: Request, res: Response) => {
    // try {

    //     const {userName, password} = req.body;

    //     if (!userName || !password) {
    //         res.status(400).json({ message: "Username and password are required" });
    //         return;
    //     }
    //     if (userName.length < 3 || userName.length > 10) {
    //         res.status(411).json({ message: "Username must be between 3 and 10 characters" });
    //         return;
    //     }
    //     if (password.length < 6 || password.length > 20) {
    //         res.status(411).json({ message: "Password must be between 6 and 20 characters" });
    //         return;
    //     }

    //     const existingUser = await User.findOne({ userName });
    //     if (existingUser) {
    //         res.status(403).json({ message: "User already exists" });
    //         return;
    //     }

    //     const salt = await bcrypt.genSalt(10);
    //     const hashPass = await bcrypt.hash(password, salt);

    //     const newUser = new User({
    //         userName,
    //         password: hashPass
    //     })

    //     await newUser.save();
    //     res.status(201).json({ message: "User created successfully", user: newUser });

    // } catch (error: any) {
    //     console.error("Error during signup:", error);
    //     res.status(500).json({ message: "Failed to create User"});

    // }

    const parsedData = req.body
    if (!parsedData.success) {
        res.status(400).json({ message: "Invalid input" });
        return;
    }
    try {

        await prismaClient.user.create({
            data: {
                email: parsedData.data?.email,
                password: parsedData.data.password,
                username: parsedData.data.userName
            }
        })

        res.json({
            userId: parsedData.data
        })
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Failed to create User" });
    }
})

authRoute.post("/signin", async (req: Request, res: Response) => {
    //  try {
    //     const { userName, password } = req.body;

    //     if (!userName || !password) {
    //         res.status(400).json({ message: "Email and password are required" });
    //         return;
    //     }
    //     const user = await User.findOne({ userName });
    //     if (!user) {
    //         res.status(400).json({ message: "Invalid email or password" });
    //         return;
    //     }
    //     const isMatch = await bcrypt.compare(password, user.password);
    //     if (!isMatch) {
    //         res.status(400).json({ message: "Invalid email or password" });
    //         return;
    //     }
    //     const jwtSecret = process.env.JWT_SIGNIN_SECRET;
    //     if (!jwtSecret) {
    //         console.error("JWT secret is missing in environment variables.");
    //         res.status(500).json({ message: "Internal server error" });
    //         return;
    //     }
    //     const token = jwt.sign({ _id: user._id }, jwtSecret, { expiresIn: "1h" });

    //     res.header("auth-token", token).json({ token });
    //     console.log("Signin successful");
    // } catch (error: any) {
    //     console.error("Signin Error:", error);
    //     res.status(500).json({ message: "Internal server error", error: error.message });
    // }

    const data = req.body
    if (!data.success) {
        res.status(400).json({ message: "Invalid input" });
        return;
    }

    const userId = 1

    if (!JWTSecret) {
        res.status(500).json({ message: "JWT secret is not configured" });
        return;
    }

    const token = jwt.sign({ userId }, JWTSecret);

    res.json({ token });
})

export default authRoute