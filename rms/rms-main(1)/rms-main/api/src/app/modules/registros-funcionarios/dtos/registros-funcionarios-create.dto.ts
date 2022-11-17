import {
  IsAlphanumeric,
  IsNumber,
  isNumber,
  IsNumberString,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { Empresa } from '../../empresa/entities';
import { PersonaNatural } from '../../persona-natural/entities';
import { BaseDto } from 'src/core/dtos/BaseDto';
import { CategoriaFuncionario } from '../../admin/categorias/categoria-funcionario/entities';

export class RegistrosFuncionariosCreateDto extends BaseDto{
  
  @ApiProperty()
  @IsString()
  personaNatural: PersonaNatural;

  @ApiProperty()
  @IsOptional()
  @IsString()
  empresa?: Empresa;

  @ApiProperty()
  @IsOptional()
  tipoCargo: CategoriaFuncionario;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  cargo: string;

  @ApiProperty()
  @IsString()
  fechaIngreso:string='';

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  ciudad: string;

  @ApiProperty()
  @IsString()
  @MaxLength(50)
  nroContrato: string;

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  estado: string;

}
