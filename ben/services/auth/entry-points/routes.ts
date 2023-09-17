import Elysia from "elysia";

export const auth_web_server = async (elysiaApp: Elysia) => {
  console.log("sono partito ?");

  elysiaApp.get("auth/register", () => "register");
};
