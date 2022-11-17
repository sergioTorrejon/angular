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
  Query, UseGuards, Req
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import {
  PersonaNaturalCreateDto,
  PersonaNaturalUpdateDto,
} from './dtos';
import { PersonaNaturalSearchDto } from './dtos/persona-natural-search.dto';
import { PersonaNaturalService } from './persona-natural.service';
import { EmpresaService } from '../empresa/empresa.service';

@ApiTags('Persona Natural')
@Controller('persona_natural')
@UseGuards(JwtAdminRoleGuard)
//@UseFilters(new HttpExceptionFilter())
export class PersonaNaturalController {
  constructor(
    private readonly service: PersonaNaturalService,
    private readonly serviceEmpresa: EmpresaService,
  ) { 
  }

  @Get('options')
  async getOptions() {
    return await this.service.getOptions();
  }

  @Get('search')
  async getSearch(
    @Req() request, @Query() pagination: PaginationDto, @Query() search: PersonaNaturalSearchDto) {
    
    const company: any = await this.serviceEmpresa.getOneByCode(request.user.company);
    search.empresa = company.id;

    console.log(search)
    return await this.service.getSearch(search,pagination);
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
  @UseGuards(JwtAdminRoleGuard)
  @Post()
  async createOne(
    @Req() request, @Body() dto: PersonaNaturalCreateDto) {
      console.log('request', request.user);
      dto.usuario_creacion = request.user.username;
      dto.fecha_creacion=new Date();

    return await this.service.createOne(dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('put'))
  @Put(':id')
  async editOne(
    @Req() request, @Param('id') id: number, @Body() dto: PersonaNaturalUpdateDto) {

    console.log('request', request);
    dto.usuario_modificacion = request.user.username;
    //dto.fecha_modificacion = new Date();

    return await this.service.editOne(id,dto);
  }

  //FUNCIONA!!!!
  //@UseGuards(RoleGuard('delete'))
  @Delete(':id')
  async logicDelete(@Param('id') id: number) {
    return await this.service.deleteOne(id);
  } 


  /// NEW ///


}