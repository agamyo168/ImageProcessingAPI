import { imageResize } from '../../services/imageProcessingService';

describe('Testing Image Processing', () => {
    it('should return true for a valid image path', async () => {
        return await imageResize('penguins.jpg', 100, 200);
    });
});
