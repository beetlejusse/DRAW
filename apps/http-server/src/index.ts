import express from "express";
import authRoute from "./routes/auth.route";
import createRoomRoute from "./routes/room.route";

const app = express()
const PORT = 5374

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/onboarding", authRoute)
app.use("/api/v1/createRoom", createRoomRoute)

app.listen(PORT, () => {
    console.log(`Server running on Port ${PORT}`);
});