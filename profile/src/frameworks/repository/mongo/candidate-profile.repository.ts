import schemas from "../../database/mongo/models";

const { CandidateProfileModel } = schemas;

// we want to export some closure
export = {
	// these fn's are returning a promise as async so we can defile return type as Promise<CandidateDataInterface>

	// createCandidateProfile is calling when the user is signed in, and then creates a basic profile
	createCandidateProfile: async (userData: any): Promise<any> => {
		console.log("inside createCandidate fn in  profile service", userData);
		const userObject = CandidateProfileModel.buildCandidate(userData);
		return await userObject.save();
	},

	getProfileByUserId: async (userId: string): Promise<any> => {
		console.log("in getProfileByuserId repository userId is ", userId);

		const candidate = await CandidateProfileModel.findById(userId);
		return candidate;
	},

	getProfileByEmail: async (email: string): Promise<any> => {
		const candidate = await CandidateProfileModel.findOne({ email });
		return candidate;
	},

	// updating and block unblocking is also doing here
	updateCandidateProfile: async (id: string, data: any): Promise<any> => {
		console.log("user update candidate repo----");

		const candidate = await CandidateProfileModel.findOneAndUpdate(
			{ userId: id },
			{ $set: data },
			{ new: true }
		);
		return candidate;
	},

	uploadProfilePic: async (id: string, url: string): Promise<any> => {
		console.log("inside uploadProfilePic repository id", id);
		console.log("inside uploadProfilePic repository url", url);

		const candidate = await CandidateProfileModel.findOneAndUpdate(
			{ _id: id },
			{ $set: { profile_image: url } },
			{ new: true }
		);
		console.log(
			"inside uploadProfilePic repository after upload",
			candidate
		);
		return candidate;
	},

	uploadResume: async (
		id: string,
		url: string,
		filename: string
	): Promise<any> => {
		console.log("inside uploadResume repository id", id);
		console.log("inside uploadResume repository url", url);
		console.log("inside uploadResume repository filename", filename);

		const candidate = await CandidateProfileModel.findOneAndUpdate(
			{ _id: id },
			{ $set: { resume: { filename, url } } },
			{ new: true }
		);
		console.log("inside uploadResume repository after upload", candidate);
		return candidate;
	},

	updateSkills: async (id: string, skills: [string]): Promise<any> => {
		console.log("inside addSkills repository id", id);
		console.log("inside addSkills repository url", skills);

		const profile = await CandidateProfileModel.findOneAndUpdate(
			{ _id: id },
			{ $set: { keySkills: skills } },
			{ new: true }
		);
		console.log("inside updateSkills repository after upload", profile);
		return profile;
	},

	// deleteSkills: async (id: string, skills: [string]): Promise<any> => {
	// 	console.log("inside deleteSkills repository id", id);
	// 	console.log("inside deleteSkills repository url", skills);

	// 	const profile = await CandidateProfileModel.findOneAndUpdate(
	// 		{ _id: id },
	// 		{ $set: { keySkills: skills } },
	// 		{ new: true }
	// 	);
	// 	console.log("inside deleteSkills repository after upload", profile);
	// 	return profile;
	// },

	getAllCandidatesProfiles: async (
		skip: number,
		limit: number
	): Promise<any[]> => {
		// const jobs = await JobModel.aggregate([{ $sort: { createdAt: 1 } }]);
		const jobs = await CandidateProfileModel.find()
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);
		console.log(jobs);
		return jobs;
	},

	getCountOfCandidatesProfiles: async (): Promise<number> => {
		const totalJobs: number = await CandidateProfileModel.countDocuments();
		console.log(totalJobs);
		return totalJobs;
	},
};

// export default repository();
