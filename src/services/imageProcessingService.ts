import sharp from 'sharp';

const imageResize = async (
    inputPath: string,
    outputPath: string,
    width: number,
    height: number,
) => {
    await sharp(inputPath).resize(width, height).toFile(outputPath);
};

export { imageResize };
