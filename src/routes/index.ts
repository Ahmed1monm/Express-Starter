import express, {Router} from "express";
import blablablaRoutes from "./blablabla.routes";

const router: Router = express.Router();

router.use("/blablabla",blablablaRoutes);

export default router;
