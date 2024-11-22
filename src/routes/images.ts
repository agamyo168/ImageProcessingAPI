import { Router } from 'express';
import { getImage } from '../controllers/images';
import imageQueryValidation from '../middlewares/image-query-validation';

const router = Router();

router.route('/images').get(imageQueryValidation).get(getImage);

export default router;
