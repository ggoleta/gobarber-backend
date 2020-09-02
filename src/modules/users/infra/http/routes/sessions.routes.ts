import { Router } from 'express';
import SessionsControllers from '../controllers/SessionsControllers';

const sessionsRouter = Router();
const sessionsControllers = new SessionsControllers();
// const usersRepository = new UsersRepository(); // precisamos jogar isso dentro da rota

sessionsRouter.post('/', sessionsControllers.create);

export default sessionsRouter;
