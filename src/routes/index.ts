import { Router } from 'express';
import usersRoutes from './api/users.routes';
import ProductsRoutes from './api/Products.routes';
import OrderRoutes from './api/Orders.routes'
const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/Products', ProductsRoutes);
routes.use('/Orders', OrderRoutes);

export default routes;
