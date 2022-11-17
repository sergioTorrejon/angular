import { Injectable } from '@nestjs/common';

import { ResDto } from './services/res/dtos/res.dto';
import { responseSuccess } from './services/res/res.config';

@Injectable()
export class AppService {
  getStatus(): ResDto {
    return responseSuccess('El servicio se encuentra activo!!!');
  }
}
