import { Router } from "express";
import * as authCtrl from "../controllers/auth.controller";

const router =Router();

router.post('/isSignin', authCtrl.isSignin);
router.post('/signin', authCtrl.signin);
router.post('/recoverypsw', authCtrl.recoverypsw);


export default router;