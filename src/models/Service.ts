import { DateTime } from 'luxon';
import mongoose, { Schema, Document, Model } from 'mongoose';
import { IServiceDocument } from '../types';

const BGBAResultadoOperacion = new Schema(
  {
    Severidad: { type: String },
    Codigo: { type: String },
    Descripcion: { type: String },
    Tipo: { type: String },
  },
  { versionKey: false, _id: false }
);

const Datos = new Schema(
  {
    Evaluacion: { type: String },
    ResultadoEvaluacion: { type: String },
  },
  { versionKey: false, _id: false }
);

const ServiceSchema = new Schema(
  {
    BGBAResultadoOperacion: {
      type: BGBAResultadoOperacion,
      default: {},
    },
    Datos: {
      type: Datos,
      default: {},
    },
    fechaCreacion: {
      type: Date,
      default: () => {
        const dt = DateTime.local();
        return dt.minus({ hours: 3 });
      },
    },
  },
  { versionKey: false }
);

// ServiceSchema.pre<IServiceDocument>('save', async function (next) {
//   console.log(this);
//   next();
// });

export const Service = mongoose.model<IServiceDocument>(
  'service_example',
  ServiceSchema,
  'service_logger'
);
