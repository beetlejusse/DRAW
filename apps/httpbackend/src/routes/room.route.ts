import { Router, Request, Response } from "express";
import { userMiddleware } from "../middleware";

const createRoomRoute = Router()

createRoomRoute.post("/create-room", userMiddleware, async (req: Request, res: Response): Promise<void> => {
    //db call

    res.json({
        roomId: 123,
    })
})

export default createRoomRoute;