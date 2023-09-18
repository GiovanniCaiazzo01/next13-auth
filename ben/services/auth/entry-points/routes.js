import { Router } from "express";
import { register } from "../domain/auth.domain";

const router = Router();

const user_defineRoutes = async (expressApp) => {
  router.post("/register", async (req, res) => {
    const payload = {
      ...req.body,
    };

    const result = await register(payload);
    return res.send(result);
  });

  expressApp.use("/user", router);
};
export default user_defineRoutes;
