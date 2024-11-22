import { promises as fsPromises } from 'fs';
import { join } from 'path';

const imagesDir = join(__dirname, '..', '..', 'public', 'images');
const outDir = join(imagesDir, 'thumb');
const fileExistsByPath = async (
    fileName: string,
    path: string = imagesDir,
): Promise<boolean> => {
    try {
        const filePath = join(path, fileName);

        // Try accessing the file directly
        await fsPromises.access(filePath);
        return true;
    } catch {
        // If access fails, assume the file does not exist
        return false;
    }
};

export { fileExistsByPath, imagesDir, outDir };
