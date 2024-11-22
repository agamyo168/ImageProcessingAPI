import sharp from 'sharp';
import { imagesDir, outDir } from '../util/fileHandler';
import { join } from 'path';
//Returns a String of the output image path.
const imageResize = async (
    filename: string,
    width: number,
    height: number,
): Promise<string> => {
    const outputPath = join(outDir, `${width} ${height} ${filename}`);
    const inputPath = join(imagesDir, filename);
    try {
        await sharp(inputPath).resize(width, height).toFile(outputPath);
        return outputPath;
    } catch (err) {
        return `${err}`;
    }
};

export { imageResize };
