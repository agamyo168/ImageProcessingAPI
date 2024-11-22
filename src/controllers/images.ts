import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { imageResize } from '../services/imageProcessingService';
import { fileExistsByPath, imagesDir, outDir } from '../util/fileHandler';
import BadRequestError from '../Errors/bad-request';
import NotFoundError from '../Errors/not-found';
import { join } from 'path';

const getImage = async (req: Request, res: Response, next: NextFunction) => {
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

    const inputPath = join(imagesDir, filename_jpg);
    const outputPath = join(outDir, `${width} ${height} ${filename_jpg}`);
    //check if image already exists:
    const isCached = await fileExistsByPath(
        `${width} ${height} ${filename_jpg}`, //new filename
        outDir,
    );
    if (!isCached) {
        console.log('Is not cached');
        await imageResize(inputPath, outputPath, Number(width), Number(height));
    }

    res.status(StatusCodes.OK).sendFile(outputPath);
};

export { getImage };
