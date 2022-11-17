import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/services/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  CategoriaFuncionarioCreateDto,
  CategoriaFuncionarioUpdateDto,
} from './dtos';
import { CategoriaFuncionario } from './entities/categoria-funcionario.entity';

@Injectable()
export class CategoriaFuncionarioService {
  constructor(
    @InjectRepository(CategoriaFuncionario)
    private readonly repository: Repository<CategoriaFuncionario>) {
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

async createOne(dto: CategoriaFuncionarioCreateDto) {

  try{
    const getOne = await  this.repository.findOne({ where:{codigo: dto.codigo, status: true }});
    if (getOne)  throw new Error('ya existe un usuario con el nombre de usuario');
    console.log('AQUI')  
    const create =  this.repository.create(dto);
    const {codigo,...data} = await  this.repository.save(create);
    return responseSuccess('Peticion Correcta',{codigo});
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}

}

async editOne(id: string, dto: CategoriaFuncionarioUpdateDto) {
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
    const {codigo,...data} = await  this.repository.save({...getOne,status:false});
    return await responseSuccess('Peticion Correcta',{codigo});
  }
  catch (error) {
  if (error instanceof Error) {
    return (responseError(error.message, error.name ));
  }
}

} 
//#endregion


async getOptions() {
const data = {
  estado_funcionario: await this.queryOptions('estado_funcionario'),
  tipo_funcionario: await this.queryOptions('tipo_funcionario')
}
return responseSuccess('Peticion Correcta',data);
}

async queryOptions(categoria:string) {
  const data = await this.repository
  .createQueryBuilder('q')
  .select('q.id as value, q.descripcion as label')
  .where('q.categoria= :categoria', { categoria: categoria })
  .getRawMany();
  return data;
  }

  async queryStringOptions(categoria:string) {
    const data = await this.repository
    .createQueryBuilder('q')
    .select('q.id as descripcion, q.descripcion as label')
    .where('q.categoria= :categoria', { categoria: categoria })
    .getRawMany();
    return data;
    }
}






