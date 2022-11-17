import {
  OmitType,
  PartialType,
} from '@nestjs/swagger';

import {
  RegistrosFuncionariosCreateDto,
} from './registros-funcionarios-create.dto';

export class RegistrosFuncionariosUpdateDto extends PartialType(
  OmitType( RegistrosFuncionariosCreateDto, ['personaNatural'] as const),
) {}
