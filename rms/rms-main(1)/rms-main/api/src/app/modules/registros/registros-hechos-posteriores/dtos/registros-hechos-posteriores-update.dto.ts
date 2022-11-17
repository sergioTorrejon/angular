import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { RegistrosHechosPosterioresCreateDto } from './';

export class RegistrosHechosPosterioresUpdateDto extends PartialType(
  OmitType(RegistrosHechosPosterioresCreateDto, ['registroBaja'] as const),
) {}
