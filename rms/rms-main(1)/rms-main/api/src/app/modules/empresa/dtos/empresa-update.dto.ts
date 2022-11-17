import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { EmpresaCreateDto } from './';

export class EmpresaUpdateDto extends PartialType(
  OmitType(EmpresaCreateDto, ['codigo',] as const),
  ) {}
  
