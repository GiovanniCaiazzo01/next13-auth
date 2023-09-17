import { Elysia } from "elysia";
import { auth_web_server } from "./services/auth/entry-points/routes";

const elysiaApp = new Elysia();

const startWebServer = async () => {
  return await Promise.all([auth_web_server(elysiaApp)]);
};

const start = async () => {
  await startWebServer().then(() => {
    const app = elysiaApp.listen(8080);
    console.log(
      `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
    );
  });
};

start();
