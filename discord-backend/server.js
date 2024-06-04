import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import socketServer from "./socketServer.js";
import friendInvitationRoutes from "./routes/friendInvitationRoutes.js";

dotenv.config();

connectDB();

const app = express();
const port = process.env.PORT || process.env.API_PORT;

app.use(express.json());
app.use(cors());

//register the routes
app.use("/api/auth", authRoutes);
app.use("/api/friend-invitation", friendInvitationRoutes);

const server = http.createServer(app);
socketServer(server);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});