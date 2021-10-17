import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { hashPassword } from './../helpers/auth.service';

export interface UserInput {
    email: string;
    name: string;
    password: string;
}


export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date; 
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
email: { type: String, required: true, unique: true},
name: { type: String, required: true },
password: { type: String, required: true}
}, {
    timestamps: true
})


userSchema.pre<UserDocument>('save', async function (next: mongoose.HookNextFunction) {
    const userDocument = this;
    const user = userDocument.toObject();
  
    if (!userDocument.isModified('password')) {
      return next();
    }
    try {
      const hash = await hashPassword(user.password);
      userDocument.password = hash;
      return next();
    } catch (error) {
      return next(error);
    }
  });

userSchema.methods.comparePassword = async function(candidatePassword: string):Promise<boolean> {
    
    const user = this as UserDocument;

    try {
        const comparePass = bcrypt.compare(candidatePassword, user.password)

        return comparePass;
    } catch (error) {
        return false
    }
}

const UserModel = mongoose.model("User", userSchema)

export default UserModel;