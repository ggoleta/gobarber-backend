import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import UsersControllers from '../controllers/UsersControllers';
import UserAvarController from '../controllers/UserAvarController';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const userAvarController = new UserAvarController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  userAvarController.create,
);

export default usersRouter;
