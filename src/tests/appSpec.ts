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
            .get('/api/v1/images?penguin')
            .query({ width: 100, height: 200 });
        expect(res.status).toBe(StatusCodes.OK);
    });
    it(`should return ${StatusCodes.NOT_FOUND} for not providing an image name`, async () => {
        const res = await request.get('/api/v1/images');
        expect(res.status).toBe(StatusCodes.NOT_FOUND);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for not providing query parameters`, async () => {
        const res = await request.get('/api/v1/images?image').query({});
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for an invalid filename`, async () => {
        const res = await request
            .get('/api/v1/images?image')
            .query({ height: 100, width: 200 });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for an invalid numbers at width and height`, async () => {
        const res = await request
            .get('/api/v1/images?image')
            .query({ height: -1, width: -1 });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for an invalid numbers at width and height`, async () => {
        const res = await request
            .get('/api/v1/images?image')
            .query({ height: -1, width: -1 });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
    it(`should return ${StatusCodes.BAD_REQUEST} for an invalid numbers at width and height`, async () => {
        const res = await request
            .get('/api/v1/images?image')
            .query({ height: 'asdasd', width: 'asdasd' });
        expect(res.status).toBe(StatusCodes.BAD_REQUEST);
    });
});
