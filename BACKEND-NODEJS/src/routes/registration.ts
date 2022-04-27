import express, { Router } from 'express';
import { register } from '../controllers/registration';

const router: Router = express.Router();

router.post('/', register);

export default router;
