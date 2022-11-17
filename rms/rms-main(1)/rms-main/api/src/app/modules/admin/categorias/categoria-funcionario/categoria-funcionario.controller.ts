import { User } from 'src/core/common/decorators/user/user.decorator';
import { PaginationDto } from 'src/core/common/dtos';
import { HttpExceptionFilter } from 'src/core/common/filters';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoriaFuncionarioService } from './categoria-funcionario.service';
import {
  CategoriaFuncionarioCreateDto,
  CategoriaFuncionarioUpdateDto,
} from './dtos';

@ApiTags('Categoria Funcionarios')
//@Auth()
@Controller('categoria_funcionario')
@UseFilters(new HttpExceptionFilter())
export class CategoriaFuncionarioController {
  constructor(
    private readonly service: CategoriaFuncionarioService,
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

  @Get('options')
  async getOptions() {
    return await this.service.getOptions();
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return await this.service.getOne(id);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('post'))
  @Post()
  async createOne(@Body() dto: CategoriaFuncionarioCreateDto) {
    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(@Param('id') id: string, @Body() dto: CategoriaFuncionarioUpdateDto) {
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  } 

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async phisicDelete(@Param('id') id: string) {
    return await this.service.deleteOne(id);
  } 
}