import { BadRequestException } from '@nestjs/common';
import { CustomValidationError } from '../../dtos/error/interfaces';

export class CustomValidationException extends BadRequestException {
  constructor(public validationErrors: CustomValidationError) {
    super();
  }
}
