import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { FailedResponseDTO } from 'src/core/common/dtos/error/failed-response.dto';
import { CustomValidationException } from 'src/core/common/exceptions';

import { logger } from 'src/services/logger/logger.service';

@Catch(CustomValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: CustomValidationException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    
    logger.setContext('CustomValidationException');
    logger.error(JSON.stringify(exception.validationErrors));

    const resp: FailedResponseDTO = {
      errorMessage: exception.message,
      errors: exception.validationErrors,
    };

    response.status(status).json(resp);
  }
}
