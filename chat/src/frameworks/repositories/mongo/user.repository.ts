import Models from "../../database/mongo/models";
import { IUser } from "../../types/user";

const { UserModel } = Models;

export = {
	createUser: async (userData: IUser) => {
		const newUser = UserModel.buildUser(userData);
		return await newUser.save();
	},

	updateUser: async (userId: string, data: Partial<IUser>): Promise<any> => {
		const user = await UserModel.findByIdAndUpdate(userId, { $set: data }, {new: true});
		return user;
	},
	
	findUserById: async (userId: string) => {
		
		const user = await UserModel.findById(userId);
		return user;
	},
	
	getAllUsers: async (skip: number, limit: number): Promise<any[]> => {
		const users = await UserModel.find()
		return users;
	},
};
