import express from "express";
import bodyParser from "body-parser";
import { auth_web_server } from "./services/auth/server";

const expressApp = express();
expressApp.use(bodyParser.json());

const startWebServer = async () => {
  return await Promise.all([auth_web_server(expressApp)]);
};

const start = async () => {
  await startWebServer().then(() => {
    expressApp.listen(8080, () => {
      console.log(`server up and running! port 8080`);
    });
  });
};

start();
