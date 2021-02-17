import { colorConsole } from 'tracer';
import { DateTime } from 'luxon';
import xss from 'xss';

const logger = colorConsole({
  format: '[{{timestamp}}]:[{{title}}] {{message}} ({{file}}:{{line}})',
  dateformat: 'HH:MM:ss dd-mm-yyyy',
  preprocess(data: any) {
    // eslint-disable-next-line
    data.title = data.title.toUpperCase();
    // eslint-disable-next-line
    data.timestamp = DateTime.local(); // 'America/Argentina/Buenos_Aires'
  },
});

type ErrorCode =
  | 'GENERAL_ERROR'
  | 'VALIDATION_ERROR'
  | 'EVALUADOR_SERVICE_ERROR'
  | 'SERVER_ERROR';

const errorLogger = (
  errorCode: ErrorCode,
  identifier: string,
  data?: any
): void => {
  logger.error(xss(`[${errorCode}][${identifier}] ${data}`));
};

export { errorLogger };

export default logger;
