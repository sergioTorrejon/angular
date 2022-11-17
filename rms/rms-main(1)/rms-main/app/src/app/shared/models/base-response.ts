export interface BaseResponse<T> {
  errores?: any;
  resultado: number;
  datos: T;
  mensaje: string;
}
