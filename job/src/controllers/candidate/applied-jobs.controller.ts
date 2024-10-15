import { Request, Response } from "express";
import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData)=>{

    const { useCases: { getAllAppliedJobsUseCase, getNumberofCandidateAppliedJobsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        const {userId} = req.currentUser!;
        
        console.log(req);
        
        // pagination
		const page = Number(req.params.page) || 1;
		const limit = Number(req.params.limit) || 3;
		const skip = (page - 1) * limit;
        
        const appliedJobs = await getAllAppliedJobsUseCase(dependencies).execute(userId, skip, limit);

        const totalJobs = await getNumberofCandidateAppliedJobsUseCase(dependencies).execute(userId)
		const numberOfPages = Math.ceil(totalJobs/limit);
        
        res.status(200).json({message: "Applied Jobs are", data: appliedJobs, totalNumberOfPages: numberOfPages  })
    };

}