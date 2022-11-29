import { Router } from 'express';
import * as controllers from '../../controllers/Products.controllers';
import authenticattionMiddleware from '../../middleware/authentication.middleware';

const routes = Router();

routes
    .route('/')
    .get(controllers.getAllProducts)
    .post(authenticattionMiddleware, controllers.create);
routes
    .route('/:id')
    .get(controllers.ChooseProduct)
    .patch(authenticattionMiddleware, controllers.updateProduct)
    .delete(authenticattionMiddleware, controllers.deleteProduct);

export default routes;
