import express from 'express';
import {
  createResultado,
  findResultadoByCuit,
  deleteResultadoById,
} from '../controllers/service.controller';

const router = express.Router();

//  /response
router.route('/create-service').post(createResultado);
router.route('/find-resultados-service/:cuit').get(findResultadoByCuit);
router.route('/delete-resultado/:id').delete(deleteResultadoById);
export default router;
