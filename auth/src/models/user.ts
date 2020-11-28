import mongoose from "mongoose";

export interface UserAttributes {
  email: string;
  password: string;
}

export type UserDocument = mongoose.Document & UserAttributes;

interface UserModel extends mongoose.Model<UserDocument> {
  build(userAttr: UserAttributes): UserDocument;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.build = (userAttr: UserAttributes) => new User(userAttr);

export const User = mongoose.model<UserDocument, UserModel>("User", userSchema);
