import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { fileExistsByPath } from '../util/fileHandler';
import NotFoundError from '../Errors/not-found';
import BadRequestError from '../Errors/bad-request';

const imageQueryValidation = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { width, height, filename } = req.query;
    if (!width || !height || !filename) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Please provide the image filename, width and height',
        });
        return;
    }
    //if filename doesn't exist:
    const filename_jpg = filename + '.jpg';
    const isFound = await fileExistsByPath(filename_jpg);
    if (isFound === false) {
        return next(new NotFoundError('No Image'));
    }

    //check if the query are not digits
    const isNotNumber = isNaN(Number(width)) || isNaN(Number(height));

    //Check if a number is not valid
    const isNotValidSize =
        Number(height) <= 0 ||
        Number(width) <= 0 ||
        !Number.isInteger(Number(height)) ||
        !Number.isInteger(Number(width));

    if (isNotValidSize || isNotNumber)
        return next(
            new BadRequestError('Please provide positive integer numbers'),
        );
    next();
};
export default imageQueryValidation;
