import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/services/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  EmpresaCreateDto,
  EmpresaUpdateDto,
} from './dtos';
import { Empresa } from './entities';

@Injectable()
export class EmpresaService {
  constructor(
    @InjectRepository(Empresa)
    private readonly repository: Repository<Empresa>) {
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
        if (!data)  throw new Error('No existe Datos con este identificador');
        return responseSuccess('Peticion Correcta',{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }
  async getOneByCode(codigo: string)  {
      try{
        const data: Empresa = await this.repository.findOne({ where:{ codigo: codigo , status:true}});
        if (!data)  throw new Error('No existe Datos con este identificador');
        return data;
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: EmpresaCreateDto) {

    try{
      const getOne = await  this.repository.findOne({ where:{codigo: dto.codigo, status: true }});
      if (getOne)  throw new Error('ya existe un usuario con el nombre de usuario');
      console.log('AQUI')  
      const create =  this.repository.create(dto);
      const data = await  this.repository.save(create);
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  async editOne(id: number, dto: EmpresaUpdateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: id , status:true}})
      console.log(getOne)
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

  async getOptions() {
    const data = await  await this.repository
    .createQueryBuilder('categoria_persona')
    .select('categoria_persona.categoria', 'value')
    .addSelect('categoria_persona.categoria', 'label')
    .distinct(true)
    .getRawMany();
    return responseSuccess('Peticion Correcta',data);
  }

}
