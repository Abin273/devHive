import express, { Router } from "express";
import { IDependenciesData } from "../../types/dependencyInterface";
import { membershipControllers } from "../../../controllers";

export const membershipPlanRouter = (dependencies: IDependenciesData) => {
	const router: Router = express.Router();

	const {
		blockUnblockMembershipController,
		createMembershipController,
		updateMembershipController,
		viewAllMembershipsController,
		viewMembershipController,
	} = membershipControllers(dependencies);

	router.post("/create-membership-plan", createMembershipController);
	router.get("/view-membership-plans", viewAllMembershipsController);
	router.get(
		"/view-membership-plan/:membershipPlanId",
		viewMembershipController
	);
	router.put(
		"/block-unblock-membership-plan/:membershipPlanId",
		blockUnblockMembershipController
	);
	router.patch("/update-membership-plan", updateMembershipController);

	return router;
};
