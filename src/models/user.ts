import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    username: string;
    authentication: {
        salt: string;
        password: string;
    };
}

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    authentication: {
        salt: { type: String, required: true },
        password: { type: String, required: true },
    },
});

export const User = mongoose.model<IUser>('User', UserSchema);