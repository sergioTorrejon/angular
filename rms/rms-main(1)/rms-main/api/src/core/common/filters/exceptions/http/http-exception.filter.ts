import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { FailedResponseDTO } from 'src/core/common/dtos/error/failed-response.dto';
import { logger } from 'src/services/logger/logger.service';
    //TODO: REVISAR SI SE PUEDE MEJORAR
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    logger.setContext('HttpException');

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();

    logger.error(JSON.stringify(exception.message));
    const resp: FailedResponseDTO = {
      errorMessage: exception.message,
    };

    response.status(status).json(resp);
  }
}