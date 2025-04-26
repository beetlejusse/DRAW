import express from "express";
import authRoute from "./routes/auth.route";
import createRoomRoute from "./routes/room.route";

const app = express();

app.use(express.json());
app.use("/api/v1/auth", authRoute)
app.use("/api/v1/createRoom", createRoomRoute)


app.listen(3001)