import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";  
import { JWT_SECRET } from "@repo/backend-common/config";

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    
    const decoded = jwt.verify(header as string, JWT_SECRET as string);

    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; 
        next(); 
    } else {
        res.status(401).json({ message: "Unauthorized User" });
    }
};