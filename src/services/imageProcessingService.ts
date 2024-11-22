import sharp from 'sharp';
import { imagesPath, outDir } from '../util/fileHandler';
import { join } from 'path';
//Returns a String of the output image path.
const imageResize = async (
    filename: string,
    width: number,
    height: number,
): Promise<string> => {
    const outputPath = join(outDir, `${width} ${height} ${filename}`);
    const inputPath = join(imagesPath, filename);
    await sharp(inputPath).resize(width, height).toFile(outputPath);
    return outputPath;
};

export { imageResize };
