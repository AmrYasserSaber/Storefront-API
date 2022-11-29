import { Router } from 'express';
import * as controllers from '../../controllers/Orders.controllers'
import authenticattionMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

routes
    .route('/')
    .get(authenticattionMiddleware, controllers.getAllOrders)
    .post(authenticattionMiddleware, controllers.create);
routes
    .route('/:id')
    .get(authenticattionMiddleware, controllers.ChooseOrder)
    .patch(authenticattionMiddleware, controllers.updateOrder)
    .delete(authenticattionMiddleware, controllers.deleteOrder);

export default routes;