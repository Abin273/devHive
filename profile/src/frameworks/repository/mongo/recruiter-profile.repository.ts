import schemas from "../../database/mongo/models";

const { RecruiterProfileModel } = schemas;

// we want to export some closure
export = {
	// These fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>
	// CreateRecruiterProfile is calling when the user is signed in, and then creates a basic profile

	createRecruiterProfile: async (userData: any): Promise<any> => {
		console.log(
			"inside create Recruiter repo in  profile service",
			userData
		);
		// const userObject = new RecruiterProfileModel(userData);
		const userObject = RecruiterProfileModel.buildRecruiter(userData);
		return await userObject.save();
	},

	getProfileByUserId: async (userId: string): Promise<any> => {
		console.log("get getRecruiterProfileByUserId repo userId ",userId);
		const recruiter = await RecruiterProfileModel.findById(userId);
		console.log("get getRecruiterProfileByUserId repo ",recruiter);
		
		return recruiter;
	},

	getProfileByEmail: async (email: string): Promise<any> => {
		const candidate = await RecruiterProfileModel.findOne({ email });
		return candidate;
	},

	// updating and block unblocking is also doing here
	updateRecruiterProfile: async (id: string, data: any): Promise<any> => {
		console.log(" in updateRecruiterProfile repo id ", id);
		console.log(" in updateRecruiterProfile repo data ", data);
		
		
		const recruiter = await RecruiterProfileModel.findOneAndUpdate(
			{ _id: id },
			{ $set: data },
			{ new: true }
		);
		return recruiter;
	},

	uploadProfilePic: async (id: string, data: any): Promise<any> => {
		const recruiter = await RecruiterProfileModel.updateOne(
			{ _id: id },
			{ $set: { resume: data } }
		);
		return recruiter;
	},

	getCandidateResume: async (id: string): Promise<any> => {
		const candidate = await RecruiterProfileModel.findById(id);
		return candidate;
	},	
};

// export default repository();
