import dotenv from "dotenv";
import express, { Express } from "express";
import swaggerUiExpress from "swagger-ui-express";
import { questionRoute } from "./core/question/question.route";
import { replyRoute } from "./core/reply/reply.route";
import { topicRoute } from "./core/topic/topic.route";
import { userRoute } from "./core/user/user.route";
import * as swaggerDocs from "./swagger-output.json";
import { uploadRoute } from "./utils/upload/upload.route";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const server: Express = express();

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
