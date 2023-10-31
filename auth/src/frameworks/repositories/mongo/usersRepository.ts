import schemas from "../../database/mongo/models";
import { UpdatePasswordInput } from "../../types/userInterface";

const { UserModel } = schemas;

// we want to export some closure
const repository = () => {
	return {

		register: async (userData: any) => {

			const userObject = new UserModel(userData);
			return userObject.save();

		},

		updatePassword: async ({ id, password }: UpdatePasswordInput) => {

			const user = await UserModel.findById(id);
			if (!user) {
				throw new Error("User not found");
			}

			user.password = password;

			return await user.save();

		},

		getByEmail: async (email: string) => {

			const user = await UserModel.findOne({ email: email });
			return user;
			
		},

		// getById: async (id: string) => {
		// 	const user = await UserModel.findByIdAndUpdate(id, {password})
		// },
	};
};

export default repository();
