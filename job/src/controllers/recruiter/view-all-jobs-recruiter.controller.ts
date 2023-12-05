import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getAllJobsRecruiterUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        console.log("in getAll job controller 1: ");

        const jobs = await getAllJobsRecruiterUseCase(dependencies).execute();
        console.log("in getAll job controller 2: ", jobs);


        res.status(200).json({message: "Jobs list", data: jobs })
    };

}