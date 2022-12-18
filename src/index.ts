import dotenv from "dotenv";
import express, { Express } from "express";
import { questionRoute } from "./core/question/question.route";
import { replyRoute } from "./core/reply/reply.route";
import { topicRoute } from "./core/topic/topic.route";
import { userRoute } from "./core/user/user.route";
import { uploadRoute } from "./utils/upload/upload.route";
import swaggerUiExpress from "swagger-ui-express";
import * as swaggerDocs from "./swagger-output.json";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const server: Express = express();

// TODO Move to somewhat dev command ?
// Documentation
// const docFile = "./swagger-output.json";
// const routes = [
//     path.join(__dirname, "core/user/user.route.ts"),
//     path.join(__dirname, "core/topic/topic.route.ts"),
//     path.join(__dirname, "core/reply/reply.route.ts"),
//     path.join(__dirname, "core/question/question.route.ts"),
// ];
// swaggerAutogen()(docFile, routes);

server.use(express.json());
server.use(express.static("public"));
server.use("/docs", swaggerUiExpress.serve);
server.get("/docs", swaggerUiExpress.setup(swaggerDocs));

server.use(uploadRoute);
server.use(userRoute);
server.use(topicRoute);
server.use(questionRoute);
server.use(replyRoute);

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
