import { Router } from 'express';
import {
  createPizza,
  deletePizza,
  getPizza,
  getPizzas,
  updatePizza,
} from './pizzaController.mjs';

const pizzaRouter = Router();

pizzaRouter.route('/').get(getPizzas).post(createPizza);

pizzaRouter.route('/:id').get(getPizza).patch(updatePizza).delete(deletePizza);

export default pizzaRouter;
