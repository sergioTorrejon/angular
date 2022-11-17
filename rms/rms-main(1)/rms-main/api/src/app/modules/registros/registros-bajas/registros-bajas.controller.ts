import { User } from 'src/core/common/decorators/user/user.decorator';
import { PaginationDto } from 'src/core/common/dtos';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RegistrosBajasUpdateDto } from './dtos';
import { RegistrosBajasService } from './registros-bajas.service';

@ApiTags('Categoria Empresa')
//@Auth()
@Controller('registros_bajas')
//@UseFilters(new HttpExceptionFilter())
export class RegistrosBajasController {
  constructor(
    private readonly service: RegistrosBajasService,
  ) { 
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get()
  async getMany(@User() user,@Query() pagination: PaginationDto) {
    return await this.service.getMany(pagination);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get('paginate')
  async _getMany(@User() user,@Query() pagination: PaginationDto) {
    return await this.service.getMany(pagination);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get(':id')
  async getOne(@Param('id') id: number) {
    return await this.service.getOne(id);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('post'))
  @Post()
  async createOne(@Body() dto: any) {
    console.log(dto)
    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(@Param('id') id: string, @Body() dto: RegistrosBajasUpdateDto) {
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  } 

}
