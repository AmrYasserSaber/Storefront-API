import { NextFunction, Request, Response } from 'express';
import UserModel from '../models/user.model';
import Jwt from 'jsonwebtoken';
import config from '../config';

const usermodel = new UserModel();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await usermodel.create(req.body);
        res.json({
            status: 'succes',
            data: { ...user },
            message: 'done creating the user'
        });
    } catch (error) {
        next(error);
    }
};

export const getAllUsers = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const users = await usermodel.getAllUsers();
        res.json({
            status: 'succes',
            data: { users },
            message: 'fetched the users'
        });
    } catch (error) {
        next(error);
    }
};

export const updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await usermodel.updateUser(req.body);
        res.json({
            status: 'succes',
            data: user,
            message: 'updated the user'
        });
    } catch (error) {
        next(error);
    }
};
export const ChooseUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await usermodel.ChooseUser(
            req.params.id as unknown as string
        );
        res.json({
            status: 'succes',
            data: { user },
            message: 'fetched the user'
        });
    } catch (error) {
        next(error);
    }
};
export const deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await usermodel.deleteUser(
            req.params.id as unknown as string
        );
        res.json({
            status: 'succes',
            data: { user },
            message: 'successfully deleted the user'
        });
    } catch (error) {
        next(error);
    }
};

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { user_name, password } = req.body;
        const user = await usermodel.authenticate(user_name, password);
        const token = Jwt.sign(
            { user },
            config.tokenSecret as unknown as string
        );
        if (!user) {
            return res.status(400).json({
                status: 'error',
                message: 'worng password or user_name'
            });
        }
        return res.json({
            status: 'success',
            data: { ...user, token },
            message: `successfully authenticated the user`
        });
    } catch (error) {
        return next(error);
    }
};
