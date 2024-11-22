import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { imageResize } from '../services/imageProcessingService';
import { fileExistsByPath } from '../util/fileHandler';

const getImage = async (req: Request, res: Response) => {
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
        res.status(StatusCodes.NOT_FOUND).json({
            error: "This image doesn't exist",
        });
        return;
    }

    const outputPath = await imageResize(
        filename_jpg,
        Number(width),
        Number(height),
    );
    if (outputPath.startsWith('Error:')) {
        res.status(StatusCodes.BAD_REQUEST).json({
            error: outputPath,
        });
        return;
    }

    //TODO: width or height are not a number.
    //TODO: width or height are in negative number.

    res.status(StatusCodes.OK).sendFile(outputPath);
};

export { getImage };
