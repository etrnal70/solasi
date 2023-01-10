import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import { readFileSync } from "fs";
import * as https from "https";
import { leaderboardRoute } from "./core/leaderboard/leaderboard.route";
import { questionRoute } from "./core/question/question.route";
import { replyRoute } from "./core/reply/reply.route";
import { searchRoute } from "./core/search/search.route";
import { topicRoute } from "./core/topic/topic.route";
import { userRoute } from "./core/user/user.route";
import { uploadRoute } from "./utils/upload/upload.route";

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string, 10);
const server: Express = express();

server.use(express.json());
server.use(cors());
server.use(express.static("public"));

server.use(uploadRoute);
server.use(userRoute);
server.use(topicRoute);
server.use(questionRoute);
server.use(replyRoute);
server.use(searchRoute);
server.use(leaderboardRoute);

const secureServer = https.createServer(
  {
    key: readFileSync(process.env.KEY_LOCATION as string),
    cert: readFileSync(process.env.CERT_LOCATION as string),
  },
  server,
);

async function start(): Promise<void> {
  try {
    secureServer.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
