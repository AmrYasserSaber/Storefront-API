import { Request, Response, NextFunction } from 'express';
import Error from '../interfaces/error.interface';
const errormiddleware = (
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const status = error.status || 500;
    const message = error.message || 'somethinge went wrong';
    res.status(status).json({ status, message });
};

// eslint-disable-next-line prettier/prettier
export default errormiddleware;
