import { Request, Response } from "express";
import { DependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: DependenciesData) => {
	const {
		useCases: { changeClosejobStatusUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		const { jobId } = req.params;
		
		const job = await changeClosejobStatusUseCase(
			dependencies
		).execute(jobId);
		
		res.status(200).json({
			message: `close status updated to ${job?.isClosed? "Close": "Open"}`,
			data: job,
		});
	};
};
