import dotenv from "dotenv";
import express, { Express } from "express";
import { userRoute } from "./core/user/user.route";
import { uploadRoute } from "./utils/upload/upload.route";
dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const server: Express = express();

server.use(express.json());
server.use(express.static("public"));

server.use(uploadRoute);
server.use(userRoute);

async function start(): Promise<void> {
    try {
        server.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
        });
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

start();
