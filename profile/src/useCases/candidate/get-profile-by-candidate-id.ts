export = (dependencies: any) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) throw new Error("candidateProfileRepository should exist in dependencies");

	const execute = async (userId: string) => {
		const profile = await candidateProfileRepository.getProfileByUserId(userId);
		return profile;
	};

	return { execute };
};
