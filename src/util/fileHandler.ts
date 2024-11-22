import { promises as fsPromises } from 'fs';
import { join } from 'path';

const folderPath = join(__dirname, '..', '..', 'public', 'images');

const fileExistsByPath = async (fileName: string): Promise<boolean> => {
    try {
        const filePath = join(folderPath, fileName);

        // Try accessing the file directly
        await fsPromises.access(filePath);
        return true;
    } catch {
        // If access fails, assume the file does not exist
        return false;
    }
};

export { fileExistsByPath };
