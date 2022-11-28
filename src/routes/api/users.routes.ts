import { Router } from 'express';
import * as controllers from '../../controllers/users.controllers';
import authenticattionMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

routes
    .route('/')
    .get(authenticattionMiddleware, controllers.getAllUsers)
    .post(controllers.create);
routes
    .route('/:id')
    .get(authenticattionMiddleware, controllers.ChooseUser)
    .patch(authenticattionMiddleware, controllers.updateUser)
    .delete(authenticattionMiddleware, controllers.deleteUser);

routes.route('/authenticate').post(controllers.authenticate);
export default routes;
