import { PaginationDto } from 'src/core/common/dtos';
import {
  responseError,
  responseSuccess,
} from 'src/services/res/res.config';
import { Repository } from 'typeorm';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  PersonaNaturalCreateDto,
  PersonaNaturalUpdateDto,
} from './dtos';
import { PersonaNaturalSearchDto } from './dtos/persona-natural-search.dto';
import { PersonaNatural } from './entities';

@Injectable()
export class PersonaNaturalService {
  constructor(
    @InjectRepository(PersonaNatural)
    private readonly repository: Repository<PersonaNatural>) {
  }

//#region CRUD SERVICES
  async getMany(pag: PaginationDto) {
    const data = await  this.repository.find({ where:{status:true}})
    console.log(data)
    const count = await  this.repository.count({where:{status:true}})
    return responseSuccess('Peticion Correcta',{data:data,count:count});
  }

  //#region CRUD SERVICES
  async getSearch(search:PersonaNaturalSearchDto, pag: PaginationDto) {
      const query = this.repository.createQueryBuilder('pn')
      .select("pn.id as id,COALESCE(pn.primer_nombre_persona,'') as primer_nombre,COALESCE(pn.segundo_nombre_persona,'') as segundo_nombre,COALESCE(pn.primer_apellido_persona,'') as primer_apellido,COALESCE(pn.segundo_apellido_persona,'') as segundo_apellido, ( COALESCE(pn.primer_nombre_persona,'') || ' ' || COALESCE(pn.segundo_nombre_persona,'') || ' ' || COALESCE(pn.primer_apellido_persona,'')  || ' ' || COALESCE(pn.segundo_apellido_persona,'')) as full_name, COALESCE(pn.nroIdentificacion,'') as nro_identificacion")
      .where('pn.status=true')

      if(search.nombres){query.andWhere("LOWER((COALESCE(pn.PrimerNombrePersona))) like LOWER(:nombres) or LOWER((COALESCE(pn.SegundoNombrePersona))) like LOWER(:nombres) or LOWER((COALESCE(pn.PrimerApellidoPersona))) like LOWER(:nombres) or LOWER((COALESCE(pn.SegundoNombrePersona))) like LOWER(:nombres) ", { nombres: `%${search.nombres}%` })}
      if(search.nroIdentificacion){query.andWhere("LOWER(COALESCE(pn.nroIdentificacion,'')) like LOWER(:nroIdentificacion)", { nroIdentificacion:  `%${search.nroIdentificacion}%` })}

      const data = await query.offset((pag.page-1)*pag.limit).limit(pag.limit).getRawMany()
      const count = await query.getCount()

      return responseSuccess('Peticion Correcta',{data:data,count:count});
  }

  async getOne(id: number)  {
      try{
        const query = this.repository.createQueryBuilder('pn')
        .select("pn.id as id,COALESCE(pn.primer_nombre_persona,'') as primer_nombre,COALESCE(pn.segundo_nombre_persona,'') as segundo_nombre,COALESCE(pn.primer_apellido_persona,'') as primer_apellido,COALESCE(pn.segundo_apellido_persona,'') as segundo_apellido, ( COALESCE(pn.primer_nombre_persona,'') || ' ' || COALESCE(pn.segundo_nombre_persona,'') || ' ' || COALESCE(pn.primer_apellido_persona,'')  || ' ' || COALESCE(pn.segundo_apellido_persona,'')) as fullName, COALESCE(pn.nroIdentificacion,'') as nroIdentificacion")
        .where('pn.status=true')
        .andWhere('pn.id= :id', { id: id })
        const data  = await  query.getRawMany()
        if (!data)  throw new Error('No existe Datos con este identificador');
        return responseSuccess('Peticion Correcta',{data:data});
    }
    catch (error) {
      if (error instanceof Error) {
        return (responseError(error.message, error.name ));
      }
    }
  }

  async createOne(dto: PersonaNaturalCreateDto) {

    try{
      const getOne = await  this.repository.findOne({ where:{nroIdentificacion: dto.nroIdentificacion, status: true }});
      if (getOne)  throw new Error('ya existe un usuario con el nombre de usuario');

      const create =  this.repository.create(dto);
      const insert = await  this.repository.save(create);
      const query = this.repository.createQueryBuilder('pn')
      .select("pn.id as id,COALESCE(pn.primer_nombre_persona,'') as primer_nombre,COALESCE(pn.segundo_nombre_persona,'') as segundo_nombre,COALESCE(pn.primer_apellido_persona,'') as primer_apellido,COALESCE(pn.segundo_apellido_persona,'') as segundo_apellido, ( COALESCE(pn.primer_nombre_persona,'') || ' ' || COALESCE(pn.segundo_nombre_persona,'') || ' ' || COALESCE(pn.primer_apellido_persona,'')  || ' ' || COALESCE(pn.segundo_apellido_persona,'')) as fullName, COALESCE(pn.nroIdentificacion,'') as nroIdentificacion")
      .where('pn.status=true')
      .andWhere('pn.id= :id', { id: insert.id })
      const data  = await  query.getRawOne()
      return responseSuccess('Peticion Correcta',data);
    }
    catch (error) {
    if (error instanceof Error) {
      return (responseError(error.message, error.name ));
    }
  }

  }

  async editOne(id: number, dto: PersonaNaturalUpdateDto) {
    try{
      const getOne = await  this.repository.findOne({ where:{status:true}})
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
