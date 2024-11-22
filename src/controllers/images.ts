import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { imageResize } from '../services/imageProcessingService';
import { fileExistsByPath } from '../util/fileHandler';
import BadRequestError from '../Errors/bad-request';
import NotFoundError from '../Errors/not-found';

const getImage = async (req: Request, res: Response, next: NextFunction) => {
    const { width, height, filename } = req.query;
    if (!width || !height || !filename) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Please provide the image filename, width and height',
        });
        return;
    }
    //TODO: if filename doesn't exist:
    const filename_jpg = filename + '.jpg';
    const isFound = await fileExistsByPath(filename_jpg);
    if (isFound === false) {
        return next(new NotFoundError('No Image'));
    }

    const outputPath = await imageResize(
        filename_jpg,
        Number(width),
        Number(height),
    );
    if (outputPath.startsWith('Error:')) {
        return next(new BadRequestError(outputPath));
    }

    //TODO: width or height are not a number.
    //TODO: width or height are in negative number.

    res.status(StatusCodes.OK).sendFile(outputPath);
};

export { getImage };
