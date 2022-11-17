import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { CategoriaFuncionarioCreateDto } from './';

export class CategoriaFuncionarioUpdateDto extends PartialType(
  OmitType(CategoriaFuncionarioCreateDto, ['categoria',"codigo"] as const),
) {}
