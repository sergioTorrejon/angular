import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

import { FailedResponseDTO } from 'src/core/common/dtos/error/failed-response.dto';
import { QueryFailedExceptionI } from 'src/core/common/dtos/error/interfaces';
import { PS_EXCEPTIONS } from 'src/core/common/filters/exceptions/query-failed/pg.errors';
import { logger } from 'src/services/logger/logger.service';
import { QueryFailedError } from 'typeorm';

    //TODO: REVISAR SI SE PUEDE MEJORAR

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedExceptionI, host: ArgumentsHost): void {
    const response = host.switchToHttp().getResponse<Response>();
    const statusCode = 500;

    const errorType = PS_EXCEPTIONS[exception.code] || 'Database Error';

    logger.setContext('QueryFailedException');
    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDTO = {
      errorMessage: exception.message,
      errorType: errorType,
    };

    if (process.env.NODE_ENV !== 'production') {
      resp.errorMessage = exception.message;
    }

    response.status(statusCode).json(resp);
  }
}
