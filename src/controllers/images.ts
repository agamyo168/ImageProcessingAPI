import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { imageResize } from '../services/imageProcessingService';

const getImage = async (req: Request, res: Response) => {
    const { width, height, filename } = req.query;
    if (!width || !height || !filename) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: 'Please provide the image filename, width and height',
        });
        return;
    }
    const outputPath = await imageResize(
        filename + '.jpg',
        Number(width),
        Number(height),
    );
    //TODO: if filename doesn't exist:
    //TODO: width or height are not a number.
    //TODO: width or height are in negative number.

    res.status(StatusCodes.OK).sendFile(outputPath);
};

export { getImage };
