import { join } from 'path';
import { imageResize } from '../../services/imageProcessingService';
import { imagesDir, outDir } from '../../util/fileHandler';

describe('Testing Image Processing', () => {
    it('should return true for a valid image path', async () => {
        return await imageResize(
            join(imagesDir, 'penguins.jpg'),
            join(outDir, '100 200 penguins.jpg'),
            100,
            200,
        );
    });
});
