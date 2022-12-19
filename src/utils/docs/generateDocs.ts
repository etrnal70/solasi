import path from "path";
import swaggerAutogen from "swagger-autogen";

// Documentation
const docFile = "./swagger-output.json";
const routes = [
  path.join(__dirname, "../../core/user/user.route.ts"),
  path.join(__dirname, "../../core/topic/topic.route.ts"),
  path.join(__dirname, "../../core/reply/reply.route.ts"),
  path.join(__dirname, "../../core/question/question.route.ts"),
];

swaggerAutogen()(docFile, routes);
