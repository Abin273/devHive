import { IDependenciesData } from "../../frameworks/types/dependencyInterface";

export = (dependencies: IDependenciesData) => {
	const { repositories: { jobApplicationRepository }} = dependencies;

	if (!jobApplicationRepository) {
		throw new Error(
			"jobApplicationRepository should exist in dependencies"
		);
	}

	const execute = async(candidateId: string, skip: number, limit: number) => {
		const appliedJobsCount = await jobApplicationRepository.getCountOfCandidateAppliedJobs(candidateId);
		const appliedJobs = jobApplicationRepository.getAllAppliedJobsByCandidateId(
			candidateId,
			skip,
			limit
		);

		return {appliedJobs, appliedJobsCount}
	};

	return { execute };
};
