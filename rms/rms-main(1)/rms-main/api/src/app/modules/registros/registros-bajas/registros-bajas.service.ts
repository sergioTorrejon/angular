import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/services/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  RegistrosFuncionariosService,
} from '../../registros-funcionarios/registros-funcionarios.service';
import {
  RegistrosHechosPosterioresService,
} from '../registros-hechos-posteriores/registros-hechos-posteriores.service';
import {
  RegistrosBajasCreateDto,
  RegistrosBajasUpdateDto,
} from './dtos';
import { RegistrosBajas } from './entities';

@Injectable()
export class RegistrosBajasService {
  constructor(
    @InjectRepository(RegistrosBajas)
    private readonly repository: Repository<RegistrosBajas>,
    private readonly serviceHechosPosteriores: RegistrosHechosPosterioresService,
    private readonly serviceRegistrosFuncionarios: RegistrosFuncionariosService,
    ) {
  }

//#region CRUD SERVICES
  async getMany(pag: PaginationDto) {
    const data = await  this.repository.find({ where:{status:true}})
    console.log(data)
    const count = await  this.repository.count({where:{status:true}})
    return responseSuccess('Peticion Correcta',{data:data,count:count});
  }

   async getOne(id: number)  {
    try{
      const data  = await  this.repository.findOne({ where:{ id: id , status:true}})
      if (!data)  throw new Error('No existe Datos con este usuario');
      return responseSuccess('Peticion Correcta',{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: RegistrosBajasCreateDto) {
    try{
      const getOne = await this.repository.createQueryBuilder('q')
      .innerJoin('q.funcionario', 'fn')
      //.innerJoin('rf.empresa', 'e')
      .where('q.status=true')
      .andWhere("q.funcionario = :funcionario", { funcionario: dto.funcionario })
      .getCount();
      console.log('COUNTTT---->',getOne)
      console.log('dto.funcionario.id---->',dto.funcionario)
      //const getOne = await  this.repository.findOne({ where:{nroBaja: dto.nroBaja, status: true }});
      if(getOne) throw new Error('ya existe un usuario con el nombre de usuario');
        
      const create =  this.repository.create(dto);
      const data = await  this.repository.save(create);
      await this.serviceHechosPosteriores.crearHechosPosteriores(data.id,dto);
      await this.serviceRegistrosFuncionarios.upDateBaja(dto.funcionario)
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  async editOne(id: string, dto: RegistrosBajasUpdateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
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

  async deleteOne(id: any) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}, relations:{funcionario:true}})
      console.log(getOne,'ANULACION',getOne.funcionario.id)
      if (!getOne)  throw new Error('No existe un usuario con este id');
      const data = await  this.repository.save({...getOne,status:false});
      await this.serviceRegistrosFuncionarios.upDateRectificacion(getOne.funcionario.id)
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  } 
//#endregion

}