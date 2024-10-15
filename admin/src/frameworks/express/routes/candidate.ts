import express, { Router } from "express";
import { candidateControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependenciesData) => {
	const router: Router = express.Router();

	const candidateController = candidateControllers(dependencies);

	// candidate
	router.get("/candidates", candidateController.getAllCandidatesController);
	router.get("/viewProfile/:userId", candidateController.getCandidateByIdController);
	router.put("/blockUnblock/:userId", candidateController.candidateBlockUnblockController);

	return router;
};
