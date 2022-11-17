import { User } from 'src/core/common/decorators/user/user.decorator';
import { PaginationDto } from 'src/core/common/dtos';
import { JwtAdminRoleGuard } from 'src/core/auth/guards/jwt-admin-role.guard';

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,UseGuards,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  RegistrosFuncionariosCreateDto,
} from './dtos/registros-funcionarios-create.dto';
import {
  RegistrosFuncionariosUpdateDto,
} from './dtos/registros-funcionarios-update.dto';
import { RegistrosFuncionariosService } from './registros-funcionarios.service';

import { EmpresaService } from '../empresa/empresa.service';
import { Empresa } from '../empresa/entities';

@ApiTags('Registros Funcionarios')
@UseGuards(JwtAdminRoleGuard)
@Controller('registros_funcionarios')
//@UseFilters(new HttpExceptionFilter())
export class RegistrosFuncionariosController {
  constructor(
    private readonly service: RegistrosFuncionariosService,
    private readonly serviceEmpresa: EmpresaService,
  ) { 
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('get'))
  @Get()
  async getMany(
    @Req() request, @Query() pagination: PaginationDto) {
    const company: any = await this.serviceEmpresa.getOneByCode(request.user.company);
    pagination.empresa = company.id;

    console.log('getMany- company', company);
    return await this.service.getManyPaginate(pagination);
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
  async createOne(
    @Req() request, @Body() dto: RegistrosFuncionariosCreateDto) {

    const company: any = await this.serviceEmpresa.getOneByCode(request.user.company);
    dto.empresa = company.id;
    dto.usuario_creacion = request.user.username;
    dto.fecha_creacion=new Date();
    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(
    @Req() request, @Param('id') id: number, @Body() dto: RegistrosFuncionariosUpdateDto) {

    const company: any = await this.serviceEmpresa.getOneByCode(request.user.company);
    dto.empresa = company.id;
    dto.usuario_creacion = request.user.username;
    dto.fecha_creacion=new Date();
    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  } 

}