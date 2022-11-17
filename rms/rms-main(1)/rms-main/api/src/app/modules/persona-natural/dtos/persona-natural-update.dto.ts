import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import { PersonaNaturalCreateDto } from './';

export class PersonaNaturalUpdateDto extends PartialType(
  OmitType(PersonaNaturalCreateDto, ['nroIdentificacion'] as const),
  ) {}
  
