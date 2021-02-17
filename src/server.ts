import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import serviceRouter from './routes/service.routes';
import logger from './utils/logger';
import { connectDB } from './db';
import errorHandler from './middlewares/errorHandler';

const VERSION = '0.0.0';
dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(
  morgan('dev', {
    skip: (req, res) => {
      return req.url === '/health';
    },
  })
);
app.use(express.json());

app.get('/health', (req, res) => res.status(200).json({ success: true }));
app.use('/service', serviceRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  logger.info(
    `Service v${VERSION} in ${process.env.NODE_ENV} mode listening on port ${PORT}.`
  );
});
