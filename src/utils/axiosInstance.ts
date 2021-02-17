import axios from 'axios';
import https from 'https';

const instance = axios.create({
  timeout: 1000 * 30,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
    requestCert: false,
  }),
});

export default instance;
