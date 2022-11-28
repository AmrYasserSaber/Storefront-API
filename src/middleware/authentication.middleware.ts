import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import config from '../config';
import Error from '../interfaces/error.interface';

const handelError = (next: NextFunction) => {
    const error: Error = new Error('please reload');
    error.status = 401;
    next(error);
};

const checkTokenMiddleware = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {
        const authHead = req.get('Authorization');
        if (authHead) {
            const bearer = authHead.split(' ')[0].toLocaleLowerCase();
            const token = authHead.split(' ')[1];
            if (token && bearer === 'bearer') {
                const decoder = Jwt.verify(
                    token,
                    config.tokenSecret as unknown as string
                );
                if (decoder) {
                    next();
                } else {
                    handelError(next);
                }
            } else {
                handelError(next);
            }
        } else {
            handelError(next);
        }
    } catch (error: unknown) {
        handelError(next);
    }
};

export default checkTokenMiddleware;
