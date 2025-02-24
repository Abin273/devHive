import Models from '../../database/mongo/models';
import { IUserDocument } from '../../database/mongo/models/user';
import { IUser } from '../../types/user';

const { UserModel } = Models;

export = {
    createUser: async (userData: IUser): Promise<IUserDocument> => {
        const newUser = UserModel.buildUser(userData);
        return await newUser.save();
    },

    updateUser: async (userId: string, data: Partial<IUser>): Promise<IUserDocument | null> => {
        const user = await UserModel.findByIdAndUpdate(userId, { $set: data }, { new: true });
        return user;
    },

    getById: async (userId: string): Promise<IUserDocument | null> => {
        const user = await UserModel.findById(userId);
        return user;
    },
};
