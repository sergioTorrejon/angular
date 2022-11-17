/* eslint-disable @typescript-eslint/camelcase */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogos } from './entities/catalogos.entity';
//import * as params from 'src/common/helpers/params';
@Injectable()
export class CatalogosService {
  constructor(
    @InjectRepository(Catalogos)
    private readonly CatalogosRepository: Repository<Catalogos>,
  ) {}
  data:any={};
  async getOptions() {
    this.data.ciudad = await this.getByKey('CIU');
    this.data.mercado = await this.getByKey('MER');
//    this.data.years=params.listYears();
    return this.data
  }
  
  async getByKey(descrip: string) {
    const data = await this.CatalogosRepository
    .find(
      { 
        select: ["cod_ele"  , "descrip"], 
        where: [ {cod_tab: descrip} ]
      }
    )
    return data;
  }

}
