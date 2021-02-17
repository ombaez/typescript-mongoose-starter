import mongoose from 'mongoose';
import logger from '../utils/logger';

export const connectDB = async () => {
  try {
    const mongoUri: string = `mongodb://${process.env.USERNAME_MONGO}:${process.env.PASSWORD_MONGO}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DB}`;

    const c = await mongoose.connect(mongoUri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    logger.info(`MongoDB connected ${c.connection.host}`);
  } catch (error) {
    logger.error(`Error: ${error.message}`);
  }
};
