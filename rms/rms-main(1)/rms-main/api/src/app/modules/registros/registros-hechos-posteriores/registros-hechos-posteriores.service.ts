import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/services/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  RegistrosHechosPosterioresCreateDto,
  RegistrosHechosPosterioresUpdateDto,
} from './dtos';
import { RegistrosHechosPosteriores } from './entities';

@Injectable()
export class RegistrosHechosPosterioresService {
  constructor(
    @InjectRepository(RegistrosHechosPosteriores)
    private readonly repository: Repository<RegistrosHechosPosteriores>) {
  }

//#region CRUD SERVICES
  async getMany(pag: PaginationDto) {
    const data = await  this.repository.find({ where:{status:true}})
    console.log(data)
    const count = await  this.repository.count({where:{status:true}})
    return responseSuccess('Peticion Correcta',{data:data,count:count});
  }

   async getOne(id: string)  {
    try{
      const data  = await  this.repository.findOne({ where:{ id: +id , status:true}})
      if (!data)  throw new Error('No existe Datos con este usuario');
      return responseSuccess('Peticion Correcta',{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async crearHechosPosteriores(id:number,dto) {
    console.log('dtonotiiii',dto)
    const hechosPosteriores = await JSON.parse(dto.hechosPosteriores);
    hechosPosteriores.forEach(async hechoPosterior => {
      hechoPosterior.registroBaja = id.toString();
      await this.createOne(hechoPosterior);
    });
  }

  async createOne(dto: RegistrosHechosPosterioresCreateDto) {
    try{
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

  async editOne(id: string, dto: RegistrosHechosPosterioresUpdateDto) {
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

  async deleteOne(id: string) {
    try{
      const getOne = await  this.repository.findOne({ where:{ id: +id , status:true}})
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