import { logger } from '../logger/index';

/**
 * This function is an error handler
 * @param {Error} error
 */
export const handleError = (
  error: { statusCode?: 500; message: any },
  from: string,
) => {
  const { statusCode = 500, message } = error;
  logger.error(
    `--- HANDLEERROR --- statusCode error : ${statusCode} - message error : ${message} from ${from}`,
  );
};
