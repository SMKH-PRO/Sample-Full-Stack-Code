import express, {
  Router,
} from 'express';
import registration from './registration';

const router: Router = express.Router();

router.use('/register', registration);

export default router;
