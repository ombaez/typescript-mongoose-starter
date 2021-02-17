import sanitize from 'mongo-sanitize';
import xss from 'xss';
import ErrorResponse from '../utils/errorResponse';
import logger, { errorLogger } from '../utils/logger';
import asyncHandler from '../middlewares/asyncHandler';
import { Service } from '../models/Service';

/* 
  Create new service instance
  POST /service/create
*/

const createResultado = asyncHandler(async (req, res, next) => {
  const { body } = req;
  const evaluacion = await Service.create({ ...sanitize(body) });

  if (!evaluacion.id) {
    await evaluacion.save();
    errorLogger(
      'GENERAL_ERROR',
      `Error al intentar salvar la informacion en la coleccion`
    );

    return next(
      new ErrorResponse(
        'Error de conexión. Espere unos minutos y vuelva a intentar la operación.',
        200
      )
    );
  }

  logger.info(`[INSTANCE_CREATED_${xss(`${evaluacion.id}`)}]}`);

  return res.json({
    success: true,
    evaluacion,
  });
});

const findResultadoByCuit = asyncHandler(async (req, res, next) => {
  const cuit = xss(req.params.cuit);
  const findAllResultadosByCuit = await Service.find({
    'Datos.Evaluacion.Documento.Numero': cuit,
  });

  if (!findAllResultadosByCuit) {
    return res.json({
      success: true,
      findAllResultadosByCuit,
    });
  }

  logger.info(
    `[EVALUACION_FINDED_${xss(`${findAllResultadosByCuit.length} results`)}]}`
  );

  return res.json({
    success: true,
    findAllResultadosByCuit,
  });
});

const deleteResultadoById = asyncHandler(async (req, res) => {
  const id = xss(req.params.id);
  const resultadoById = await Service.findByIdAndDelete(id);

  if (!resultadoById) {
    logger.info(`[EVALUACION_NOT_FDUND ==> ${xss(`${id}`)}]}`);

    return res.json({
      success: false,
      msg: 'No se encontraron registros.',
    });
  }

  logger.info(`[EVALUACION_DELETED ==> ${xss(`${resultadoById.id}`)}]}`);

  return res.json({
    success: true,
    resultadoById,
  });
});

export { createResultado, findResultadoByCuit, deleteResultadoById };
