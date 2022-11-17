
import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CatalogosService } from './catalogos.service';

ApiTags('Catalogos')
@Controller('catalogos')
export class CatalogosController {
  constructor(
    private readonly catalogosService: CatalogosService,
  ) {}

@Get('options')
  async getOption() {
    const data = await this.catalogosService.getOptions();
    return { data };
  }

}
