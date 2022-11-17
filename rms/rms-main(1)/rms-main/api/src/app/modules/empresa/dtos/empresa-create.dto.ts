import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class EmpresaCreateDto {
  
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  codigo: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(20)
  nombre: string;

  @ApiProperty()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  nombreCorto: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  nroSeprem?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(1)
  @MaxLength(128)
  nit?: string;

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
