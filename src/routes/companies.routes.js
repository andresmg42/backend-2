import { Router } from "express";
import * as companyCtrl from "../controllers/companies.controller";
import { verifyToken } from "../middelwares";
const router =Router();


router.get('/', verifyToken, companyCtrl.getCompanies);
router.post('/',verifyToken, companyCtrl.createCompany);
router.get('/:id', verifyToken, companyCtrl.getCompanyById);
router.put('/', verifyToken, companyCtrl.updateCompany);
router.put('/:id',verifyToken, companyCtrl.undeleteCompany);
router.delete('/:id',verifyToken, companyCtrl.deleteCompanyById);
router.purge('/:id',verifyToken, companyCtrl.eraseCompanyById);

export default router;