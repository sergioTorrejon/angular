export interface QueryFailedExceptionI extends Error {
  code: string;
  message: string;
}
