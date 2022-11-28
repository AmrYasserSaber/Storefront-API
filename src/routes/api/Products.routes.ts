import { Router } from 'express';
import * as controllers from '../../controllers/Products.controllers';
import authenticattionMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

routes
    .route('/')
    .get(authenticattionMiddleware, controllers.getAllProducts)
    .post(authenticattionMiddleware, controllers.create);
routes
    .route('/:id')
    .get(authenticattionMiddleware, controllers.ChooseProduct)
    .patch(authenticattionMiddleware, controllers.updateProduct)
    .delete(authenticattionMiddleware, controllers.deleteProduct);

export default routes;
