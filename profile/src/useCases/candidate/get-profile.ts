export = (dependencies: any) => {
	const {
		repositories: { candidateProfileRepository },
	} = dependencies;

	if (!candidateProfileRepository) {
		throw new Error(
			"candidateProfileRepository should exist in dependencies"
		);
	}

	const execute = (id: string) => {
		const createdToken = candidateProfileRepository.getProfileById(id);
		
		return createdToken;
	};

	return { execute };
};
