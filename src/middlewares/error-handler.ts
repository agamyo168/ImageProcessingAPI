import { NextFunction, Request, Response } from 'express';
import CustomError from '../Errors/custom-error';

const errorHandlerMiddleware = (
    err: CustomError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    res.status(err.httpStatusCode).json({
        error: { ...err, message: err.message },
    });
    return next();
};

export default errorHandlerMiddleware;
