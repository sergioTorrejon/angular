import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { FailedResponseDTO } from 'src/core/common/dtos/error/failed-response.dto';
import { logger } from 'src/services/logger/logger.service';

@Catch(BadRequestException)
export class BadRequestExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    logger.setContext('BadRequestException');
    logger.error(JSON.stringify(exception.message));

    const resp: FailedResponseDTO = {
      errorMessage: exception.message,
    };

    response.status(status).json(resp);
  }
}
