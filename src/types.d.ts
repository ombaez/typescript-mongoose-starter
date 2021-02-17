import { Request } from 'express';
import { Document } from 'mongoose';

export interface IServiceDocument extends IService, Document {}

export interface RequestWithResultado extends Request {
  body: IService;
}

export interface IService {
  BGBAResultadoOperacion: BGBAResultadoOperacion;
  Datos: Datos;
}

export interface BGBAResultadoOperacion {
  Severidad: string;
  Codigo: string;
  Descripcion: string;
  Tipo: string;
}

export interface Datos {
  Evaluacion: string;
  ResultadoEvaluacion: string;
}
