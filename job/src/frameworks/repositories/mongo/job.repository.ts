import schemas from "../../database/mongo/models";

const { JobModel } = schemas;

export = {
	createJob: async (jobData: any) => {
		console.log("job repository jobData", jobData);

		const newJob = JobModel.buildJob(jobData);
		console.log(newJob);
		return await newJob.save();
	},

	deleteJob: async (jobId: string) => {
		const deletedJob = await JobModel.deleteOne({ _id: jobId });
		console.log("deletedJob: ", deletedJob);
		return deletedJob;
	},

	updateJob: async (jobId: string, data: object) => {
		console.log("in updateJob repository jobId", jobId, " data ", data);

		const updatedJob = await JobModel.findOneAndUpdate(
			{ _id: jobId },
			{ $set: data },
			{ new: true }
		);
		
		console.log("in updateJob repository after update", updatedJob);
		return updatedJob;
	},


	changeClosejobStatus: async (jobId: string) => {
		console.log("in updateJob repository changeClosejobStatus jobId", jobId, " data ");

		const job: any = await JobModel.findById(jobId)
		if(job){
			job.isClosed = !job?.isClosed // Toggle the boolean field
			const updatedJob = await job.save();
			console.log("in updateJob repository after changeClosejobStatus", updatedJob);
			return updatedJob
		}
		
		console.log("in job not fount", job);

		return job;
	},

	filterJob: async (jobFilterData: object) => {
		const filteredJobs = await JobModel.find(jobFilterData);
		return filteredJobs;
	},

	getAllJobs: async (skip: number, limit: number, applicationJobIds?: string[]): Promise<any[]> => {
			console.log("getalljobss repo )))))))))))))))",skip, limit, applicationJobIds);
		let jobs;
	if(applicationJobIds){
		jobs = await JobModel.find({ _id: { $nin: applicationJobIds } })
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
	}else{
		jobs = await JobModel.find()
		.sort({ createdAt: -1 })
		.skip(skip)
		.limit(limit);
	}

	console.log(jobs);
	return jobs;
},

	// getAllJobs: async (skip: number, limit: number): Promise<any[]> => {
	// 	const jobs = await JobModel.find({isActive: true, isClosed: false})
	// 		.sort({ createdAt: -1 })
	// 		.skip(skip)
	// 		.limit(limit);
	// 	console.log("getalljobss )))))))))))))))",jobs);
	// 	return jobs;
	// },

	getCountOfJobs: async (applicationJobIds?: string[]): Promise<number> => {
		let totalJobs;
		if(applicationJobIds){
			totalJobs = await JobModel.countDocuments({ _id: { $nin: applicationJobIds } });
		}else{
			totalJobs = await JobModel.countDocuments();
		}

		console.log(totalJobs);
		return totalJobs;
	},
	
	// getCountOfJobs: async (): Promise<number> => {
	// 	const totalJobs: number = await JobModel.countDocuments({isActive: true, isClosed: false});
	// 	console.log(totalJobs);
	// 	return totalJobs;
	// },

	getAllJobsDistinctValues: async (fields: Array<string>): Promise<any> => {
		// const jobs = await JobModel.aggregate([{ $sort: { createdAt: 1 } }]);
		// const fields = ['title', 'company_location', 'employment_type'];

		// Get distinct values for the specified fields
		const distinctValues: any = {};
		for (const field of fields) {
		  distinctValues[field] = await JobModel.distinct(field);
		}

		console.log(distinctValues);
		
		return distinctValues;
	},

	getAllJobsByRecruiterId: async (id: string): Promise<any[]> => {
		const jobs = await JobModel.find({ recruiterId: id }).sort({
			createdAt: -1,
		});
		console.log(jobs);
		return jobs;
	},

	

	numberOfCreatedJobsByMe: async (id: string): Promise<number> => {
		console.log("numberOfCreatedJobsByMe =======", id);
		
		const jobs = await JobModel.countDocuments({ recruiterId: id });
		console.log("numberOfCreatedJobsByMe ",jobs);
		return jobs;
	},

	
	getSearchResults: async (searchKey: string): Promise<number> => {
		const searchedJobs: any = await JobModel.find({ jobTitle: { $regex: new RegExp(searchKey, 'i') } })
		console.log("searchedJobs ",searchedJobs);
		return searchedJobs;
	},

	getCountOfSearchResults : async (searchKey: string): Promise<number> => {
		const searchedJobsCount: number = await JobModel.find({ jobTitle: { $regex: new RegExp(searchKey, 'i') } }).countDocuments();
		console.log("searchedJobsCount ",searchedJobsCount);
		return searchedJobsCount;
	},

	getAJob: async (id: string) => {
		console.log(id, "in job repository");

		// const job = await JobModel.findById(id)
		// const job = await JobModel.findById(id).populate('users')
		const job = await JobModel.findById(id).populate({
			path: 'recruiterId',
			model: 'User', // Assuming your User model is named 'User'
			// select: 'name email profileImgUrl userType', // Select the fields you want to populate
		});

		// console.log("inside get A job  ============");
		// console.log(job);
		// console.log("inside get A job ============");

		return job;
	},
	

};
