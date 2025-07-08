import { Router,Request, Response } from "express";
import { userMiddleware } from "../middleware";
import { createRoomSchema } from "@repo/zod-common/zodtypes";

const roomRoute: Router = Router()

roomRoute.post("/create-room", userMiddleware, async (req: Request, res: Response): Promise<void> => {

        const data = createRoomSchema.safeParse(req.body);
        if (!data.success) {
            res.status(400).json({ message: "Invalid input" });
            return;
        }
    
    //db call

    res.json({
        roomId: 123,
    })
})

export default roomRoute