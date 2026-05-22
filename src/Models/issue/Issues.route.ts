import { Router } from "express";
import { allIssuesCollection } from "./issues.controller";
import { Protecte } from "../../middleware/protectedRoute";

const router = Router()
router.post('/',allIssuesCollection.CreatIssuFild)
router.get('/',allIssuesCollection.getAllIssues)
router.get('/:id',allIssuesCollection.getSingleIssu)
router.patch('/:id',Protecte("maintainer"),allIssuesCollection.UpdateUser)
router.delete('/:id',Protecte("maintainer"),allIssuesCollection.deletIssu)

export   const issuesRouter = router