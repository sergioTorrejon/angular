import {
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  CategoriaFuncionario,
} from 'src/app/modules/admin/categorias/categoria-funcionario/entities';

import { ApiProperty } from '@nestjs/swagger';

import { RegistrosBajas } from '../../registros-bajas/entities';
import { CategoriaRegistro } from 'src/app/modules/admin/categorias/categoria-registro/entities';

export class RegistrosHechosPosterioresCreateDto {

  @ApiProperty()
  @IsString()
  registroBaja: RegistrosBajas;

  @ApiProperty()
  @IsString()
  causal: CategoriaRegistro;
  
  @IsOptional()
  @IsString()
  fecha?:string='';

  @IsOptional()
  @IsString()
  @MaxLength(2000,{message:'La longitud rc_comentarios no puede ser menor a 2 caracteres y mayor a 2000 caracteres'})
  descripcion?: string='';

  @ApiProperty()
  @IsString()
  @MaxLength(20)
  estado: string;


}
