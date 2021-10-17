import { DocumentDefinition } from "mongoose";
import UserModel, { UserDocument, UserInput } from "../models/user.model";

export async function createuser(input: UserInput) {
    try {
        const user = await UserModel.create(input);
        return user;
    } catch (error: any) {
        // return error
        throw new Error(error);
    }
}