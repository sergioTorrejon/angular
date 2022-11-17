import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from 'src/core/dtos/BaseDto';

export class PersonaNaturalCreateDto extends BaseDto {
  
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  nroIdentificacion: string;
  

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  PrimerNombrePersona: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  SegundoNombrePersona?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  descripSubCategoria?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  PrimerApellidoPersona?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  SegundoApellidoPersona?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  nro_documento_identidad?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  telefono?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  direccion?: string;

}
