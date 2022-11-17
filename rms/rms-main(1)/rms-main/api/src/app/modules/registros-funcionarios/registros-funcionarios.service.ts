import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/services/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { RegistrosFuncionariosCreateDto } from './dtos';
import {
  RegistrosFuncionariosUpdateDto,
} from './dtos/registros-funcionarios-update.dto';
import { RegistrosFuncionarios } from './entities';

import { Empresa } from '../empresa/entities';

const selectMany =`
rf.id as id,
COALESCE(pn.primer_nombre_persona,'') as primer_nombre, 
COALESCE(pn.segundo_nombre_persona,'') as segundo_nombre,
COALESCE(pn.primer_apellido_persona,'') as primer_apellido, 
COALESCE(pn.segundo_apellido_persona,'') as segundo_apellido,
e.codigo as codigo_empresa, 
e.nombre as nombre_empresa,
rf.ciudad as ciudad,
COALESCE(rf.nro_contrato,'') as nro_contrato,
rf.cargo as cargo,
rf.estado as estado,
rf.status as status,
tc.descripcion as tipo_cargo,
tc.id as id_tipo_cargo,
to_char(rf.fecha_ingreso,'DD-MM-YYYY') as fecha_ingreso,
pn.nroIdentificacion as nro_identificacion,
COALESCE(baja.id,0) as id_registro_baja
`
@Injectable()
export class RegistrosFuncionariosService {
  constructor(
    @InjectRepository(RegistrosFuncionarios)
    private readonly repository: Repository<RegistrosFuncionarios>,
    ) {
  }

  

//#region CRUD SERVICES
  async getManyPaginate(pag: PaginationDto) {

    const query = this.repository.createQueryBuilder('rf')
        .innerJoin('rf.personaNatural', 'pn')
        .innerJoin('rf.empresa', 'e')
        .leftJoinAndSelect("rf.bajas", "baja", "baja.status = :status", {
            status: true,
          })
        .leftJoinAndSelect("rf.tipoCargo", "tc")
        .where('rf.status=true');
    if(pag.empresa)
      query.andWhere('rf.id_empresa= :id_empresa', { id_empresa: pag.empresa });

    const data = await query.select(selectMany).offset((pag.page-1)*pag.limit).limit(pag.limit).getRawMany()
    const count = await query.getCount()

    return responseSuccess('Peticion Correcta',{data:data,count:count});
  }
   
  async getOne(id: number)  {
    try{
      const data  = await this.repository.createQueryBuilder('rf')
      .select(selectMany)
      .innerJoin('rf.personaNatural', 'pn')
      .innerJoin('rf.empresa', 'e')
      .where('rf.status=true')
      .andWhere("rf.id = :id", { id: id })
      .getRawOne();
      if (!data)  throw new Error('No existe Datos con este usuario');
      return responseSuccess('Peticion Correcta',{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: RegistrosFuncionariosCreateDto) {

    try{
      const getOne = await this.repository.createQueryBuilder('rf')
      .innerJoin('rf.personaNatural', 'pn')
      .innerJoin('rf.empresa', 'e')
      .innerJoin("rf.bajas", "baja")
      .where('rf.status=true')
      .andWhere("rf.personaNatural = :personaNatural", { personaNatural: dto.personaNatural })
      .getCount();
      if (getOne)  throw new Error('ya existe un usuario con el nombre de usuario');
      const create =  this.repository.create(dto);
      const data = await this.repository.save(create);
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
      }
    }
  }

  async editOne(id: number, dto: RegistrosFuncionariosUpdateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const edited = Object.assign(getOne);
      const {username,...data} = await  this.repository.save(edited);
      return responseSuccess('Peticion Correcta',{username});
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }


  }

  async upDateBaja(id: any) {
    console.log(id,'IIIIIIIIIDDDDDDDDDDDDDD')
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
      console.log('USUARIO',getOne)
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const edited = Object.assign(getOne);
      edited.estado='baja';
      //edited.status=false
      const data = await  this.repository.save(edited);
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }


  }

  async upDateRectificacion(id: any) {
    console.log(id,'IIIIIIIIIDDDDDDDDDDDDDD')
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id}})
      console.log('USUARIO',getOne)
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const edited = Object.assign(getOne);
      edited.estado='activo';
      edited.status=true
      const data = await  this.repository.save(edited);
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }


  }

  async deleteOne(id: number) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const data = await  this.repository.save({...getOne,status:false});
      return await responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }
  } 
//#endregion
}