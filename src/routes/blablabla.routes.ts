import express, {Router} from "express";
import { 
    createBlablablaController, getBlablablaController, getAllBlablablas, updateBlablablaController, deleteBlablablaController
     } from "controllers/blablabla.controller";

const router: Router = express.Router();

router.route("/")
    .get(getAllBlablablas)
    .post(createBlablablaController);
router.route("/:id")
    .get(getBlablablaController)
    .put(updateBlablablaController)
    .delete(deleteBlablablaController);


export default router;