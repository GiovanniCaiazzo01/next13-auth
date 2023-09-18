import user_defineRoutes from "./entry-points/routes";

export const auth_web_server = async (expressApp) => {
  await user_defineRoutes(expressApp);
};
