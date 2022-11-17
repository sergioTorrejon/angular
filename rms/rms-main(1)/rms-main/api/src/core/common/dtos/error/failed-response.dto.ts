import { CustomValidationError } from "./interfaces";

export class FailedResponseDTO {
  errorMessage: string;
  errors?: CustomValidationError;
  errorType?: string;
}