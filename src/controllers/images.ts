import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { imageResize } from '../services/imageProcessingService';
import { fileExistsByPath, imagesDir, outDir } from '../util/fileHandler';
import { join } from 'path';

const getImage = async (req: Request, res: Response) => {
    const { width, height, filename } = req.query;
    const filename_jpg = filename + '.jpg';

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
