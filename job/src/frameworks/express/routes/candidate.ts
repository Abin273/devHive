import express from "express";

import { auth, checkCurrentUser, ROLES } from "@abijobportal/common";
import { jobsControllers, candidateJobControllers } from "../../../controllers";
import { IDependenciesData } from "../../types/dependencyInterface";

export const candidateRouter = (dependencies: IDependenciesData) => {
    const router = express.Router();

    const  jobsController = jobsControllers(dependencies);
    const candidateJobController = candidateJobControllers(dependencies);

    // This route is to get all jobs. It's a post req because i am passing some data to server.
    router.get("/all-jobs/:page", checkCurrentUser, jobsController.viewAllJobsController);

    router.post(
        "/all-job-fields-distinct-values",
        jobsController.viewAllJobFieldsDistinctValuesController);

    router.get("/:id", jobsController.viewJobByJobIdController);

    router.post("/filter", jobsController.filterJobsController);

    router.post("/search/:page", jobsController.searchJobsController);

    router.use(checkCurrentUser);
    router.use(auth(ROLES.CANDIDATE));

    router.post("/apply", candidateJobController.applyJobController);

    router.get("/applied-jobs/:candidateId/:page", candidateJobController.appliedJobsController);

    router.get(
        "/job-application/:jobApplicationId",
        candidateJobController.viewPliedJobApplicationController);

    return router;
};
