import { Request, Response } from "express";
import { BadRequestError } from "@abijobportal/common";

import { comparePassword } from "../../frameworks/services/password";
import { createJwtToken } from "../../frameworks/services/jwtToken";

export = (dependencies: any) => {
	const {
		useCases: { getRecruiterByEmailUseCase },
	} = dependencies;

	return async (req: Request, res: Response) => {
		try {
			const { email, password } = req.body;

            // check user exist
			const isExistingUser = await getRecruiterByEmailUseCase(
				dependencies
			).execute(email);

			if (!isExistingUser) {
                // return res.status(400).json({message:"Invalid email or password"})

				throw new BadRequestError("Invalid email or password");
			}

            // check password is correct
            const isSamePassword = await comparePassword(password, isExistingUser.password);

            if(!isSamePassword){
                // return res.status(400).json({message:"Invalid email or passwordd"})

                throw new BadRequestError("Invalid email or passwordd");
            }

			// Generate Jwt
            const recruiterPayloadData = {
				id: isExistingUser.id,
				email: isExistingUser.email,
				userType: isExistingUser.userType,
			};
			
            // Generate Jwt key
			const recruiterJWT = createJwtToken(recruiterPayloadData);

            // Store it on session object
            // req.session = {jwt: recruiterJWT};

            // Store it on cookie
            res.cookie('recruiterToken', recruiterJWT, { httpOnly: true })

            res.status(200).json({message: "Login successful", data: isExistingUser})
		} catch (error) {
			console.log(error);
		}
	};
};
