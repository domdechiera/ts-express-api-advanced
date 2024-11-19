import { Request, Response } from 'express';
import { User } from '../models/user';
import crypto from 'crypto';

const generateSalt = () => crypto.randomBytes(16).toString('hex');
const hashPassword = (salt: string, password: string) => crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
export const register = async (req: Request, res: Response) => {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
        return res.status(400).send('Missing required fields');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).send('Missing requred fields');
    }

    const salt = generateSalt();
    const hashedPassword = hashPassword(salt, password);

    const newUser = new User({
        email,
        username,
        authentication: {
            salt,
            password: hashedPassword,
        },
    });

    await newUser.save();
    return res.status(201).send('User registered successfully');
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Missing required fields');
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).send('User not found');
    }

    const hashedPassword = hashPassword(user.authentication.salt, password);
    if (hashedPassword !== user.authentication.password) {
        return res.status(400).send('Invalid credentials');
    }

    return res.status(200).send('Login successful');
};