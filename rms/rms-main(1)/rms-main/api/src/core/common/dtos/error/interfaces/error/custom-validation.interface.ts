export interface CustomValidationError {
    [key: string]: CustomValidationError | string[];
}