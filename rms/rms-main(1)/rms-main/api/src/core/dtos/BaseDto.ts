import {
    IsOptional,
    IsString,
    IsBoolean,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  
  export class BaseDto {
    @IsBoolean()
    @IsOptional()
    eliminado: boolean;
  
    @IsString()
    @IsOptional()
    usuario_creacion: string = '';
  
    //@IsString()
    @IsOptional()
    fecha_creacion: Date = new Date();
  
    @IsString()
    @IsOptional()
    usuario_modificacion: string = '';
  
    //@IsString()
    @IsOptional()
    fecha_modificacion: Date = new Date();  
  }
  