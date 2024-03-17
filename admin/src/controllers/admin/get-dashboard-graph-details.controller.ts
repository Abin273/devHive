import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData)=>{

    const { useCases: { getDashboardGraphDetailsUseCase }} = dependencies

    return async (req: Request, res: Response)=>{
        
        const dashboardGraphDetails = await getDashboardGraphDetailsUseCase(dependencies).execute();


        console.log("inside get  dashboard graph derails controller ",dashboardGraphDetails);

        res.status(200).json({message: "dashboard graph details", data: dashboardGraphDetails })
    };

}