import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { CategoriaPersonaCreateDto } from './';

export class CategoriaPersonaUpdateDto extends PartialType(
  OmitType(CategoriaPersonaCreateDto, ['nivel','categoria',"codigo"] as const),
  ) {}
  
