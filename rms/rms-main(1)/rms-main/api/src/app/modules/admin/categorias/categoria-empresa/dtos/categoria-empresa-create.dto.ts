import {
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CategoriaEmpresaCreateDto {
  
  @ApiProperty()
  @IsOptional()
  @IsNumber()
  nivel?: number;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  categoria: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  codigo: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(250)
  descripcion: string;

}