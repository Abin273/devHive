export = (dependencies: any) => {
	const {
		repositories: { usersRepository },
	} = dependencies;

	// if (!emailVerificationTokenRepository) {
	// 	throw new Error(
	// 		"emailVerificationTokenRepository should exist in dependencies"
	// 	);
	// }

	if (!usersRepository) {
		throw new Error("usersRepository should exist in dependencies");
	}

	const execute = async ({ otp, email }: { otp: number; email: string }) => {
		const user = await usersRepository.getByEmail(email);

		if (user.otp !== otp) {
			return false;
		}

		// delete otp
		await usersRepository.deleteOtp(email);
		// // delete verified token
		// emailVerificationTokenRepository.deleteToken(tokenDetails);

		// to update user verification status in users collection
		await usersRepository.updateVerification(email);
		return true;
	};

	return { execute };
};
