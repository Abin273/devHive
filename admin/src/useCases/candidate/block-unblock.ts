export = (dependencies: any) => {
	const { repositories:{candidateRepository} } = dependencies;

	if (!candidateRepository) {
		throw new Error("candidateRepository should exist in dependencies");
	}

	const execute = (id: string) => {
		return candidateRepository.blockUnblock(id);
	};

	return { execute };
};
