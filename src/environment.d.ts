declare global {
  namespace NodeJS {
    interface ProcessEnv {
      USERNAME_MONGO: string;
      PASSWORD_MONGO: string;
      MONGODB_DB: string;
      MONGODB_HOST: string;
      MONGODB_PORT: string;
      SERVICE: string;
    }
  }
}

export {};
