import { Router } from 'express';
import { getImage } from '../controllers/images';

const router = Router();

router.route('/images').get(getImage);

export default router;
