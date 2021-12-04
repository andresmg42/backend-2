import { Router } from "express";
import user from "./users.routes";
import auth from "./auth.routes";
import companies from "./companies.routes";
import cliente from "./cliente.routes";


const router = Router();


router.use("/api/auth",auth);
router.use("/api/client",cliente);
router.use("/api/user",user);
router.use("/api/companies",companies);


export default router;