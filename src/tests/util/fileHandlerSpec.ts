import { fileExistsByPath } from '../../util/fileHandler';
describe('Testing File Handler', () => {
    it('should return true for a valid image path', async () => {
        const result = await fileExistsByPath('penguins.jpg');
        expect(result).toBe(true);
    });
    it('should return false for not providing a valid extension', async () => {
        const result = await fileExistsByPath('penguins');
        expect(result).toBe(false);
    });
    it('should return false for providing a non-existent image', async () => {
        const result = await fileExistsByPath('bird.jpg');
        expect(result).toBe(false);
    });
});
