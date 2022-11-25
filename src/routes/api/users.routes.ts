import { Router } from 'express'
import * as controllers from '../../controllers/users.controllers'

const routes = Router();

routes.route('/').get(controllers.getAllUsers).post(controllers.create);
routes
    .route('/:id')
    .get(controllers.ChooseUser)
    .patch(controllers.updateUser)
    .delete(controllers.deleteUser)
export default routes;
