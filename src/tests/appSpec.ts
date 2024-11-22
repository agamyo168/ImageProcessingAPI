import supertest from 'supertest';
import app from '../app';
import { StatusCodes } from 'http-status-codes';

const request = supertest(app);
describe('Image endpoint tests', () => {
    //beforeAll
    //afterAll
    //beforeEach -- (setupFn)
    //afterEach -- (teardownFn)
    it(`should return ${StatusCodes.NOT_FOUND} for an invalid URL.`, async () => {
        const res = await request.get('/invalid');
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
    it(`should return ${StatusCodes.OK} for entering a valid image.`, async () => {
        const res = await request
            .get('/api/v1/images')
            .query({ filename: 'penguins', width: 100, height: 200 });
        expect(res.status).toBe(StatusCodes.OK);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for not providing query parameters`, async () => {
        const res = await request.get('/api/v1/images').query({});
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it(`should return ${StatusCodes.NOT_FOUND} for a non-existent filename`, async () => {
        const res = await request
            .get('/api/v1/images')
            .query({ filename: 'bird', height: 100, width: 200 });
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for an invalid numbers at width and height`, async () => {
        const res = await request
            .get('/api/v1/images')
            .query({ filename: 'penguins', height: -1, width: -1 });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for not providing numbers at width and height`, async () => {
        const res = await request
            .get('/api/v1/images?')
            .query({ filename: 'penguins', height: 'asdasd', width: 'asdasd' });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
});
