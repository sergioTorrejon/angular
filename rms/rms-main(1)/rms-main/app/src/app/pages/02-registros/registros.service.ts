import {
  HttpClient,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' })};

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = environment.api;
    }

    /** CARTAS RESOLUCIONES */
    /** DATA DOCUMENTOS PAGINADOS */
    getDocs(dto: any,page:  any):  Observable<any>
    {
      return this.http.get<any[]>(`${this.url}/${dto.model}?` +
      (page.page === 0? ``: `&page=${page.page}`) +
      (page.limit === 0? ``: `&limit=${page.limit}`) +
      (page.sort === ''? ``: `&sort=${page.sort}`) +
      (page.order === ''? ``: `&order=${page.order}`) +
      (dto.modulo === ''? ``: `&modulo=${dto.modulo}`) +
      (dto.etapa === ''? ``: `&etapa=${dto.etapa}`) +
      (dto.entidad === ''? ``: `&rc_inten=${dto.entidad}`) +
      (dto.year === 0? ``: `&rc_year=${dto.year}`) +
      (dto.tipo === ''? ``: `&rc_tipo=${dto.tipo}`) +
      (dto.numero === ''? ``: `&rc_numero=${dto.numero}`) +
      (dto.titulo === ''? ``: `&rc_titulo=${dto.titulo}`) +
      (dto.subtipo === ''? ``: `&rc_subtipo=${dto.subtipo}`) +
      (dto.mercado === ''? ``: `&rc_mercado=${dto.mercado}`) +
      (dto.del === ''? ``: `&del=${this.formatDate(dto.del)}`) +
      (dto.al === ''? ``: `&al=${this.formatDate(dto.al)}`)
      ).pipe();
    }

    getFuncionarios(dto:any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
    {
      console.log(dto,'DTOOOOOOOOO')
      return this.http.get<any[]>(`${this.url}/${dto.model}?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.estado === ''? ``: `&etapa=${dto.estado}`) +
      (dto.tipoFuncionario === ''? ``: `&etapa=${dto.tipoFuncionario}`) +
      (dto.fechaIngreso === ''? ``: `&del=${this.formatDate(dto.fechaIngreso)}`) +
      (dto.nroIdentificacion === ''? ``: `&etapa=${dto.nroIdentificacion}`) +
      (dto.nombres === ''? ``: `&etapa=${dto.nombres}`) +
      (dto.apellidos === ''? ``: `&etapa=${dto.apellidos}`)
      ).pipe();
    }

    /** DOWNLOAD PDF */
    getRegistros():  Observable<any> {
      return this.http.get(`${this.url}/registros_funcionarios`).pipe();
    }

    /** DOWNLOAD PDF */
    getPersonas(dto:any ,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any> {
      return this.http.get(`${this.url}/persona_natural/search?` +
      (page === 0? ``: `&page=${page}`) +
      (limit === 0? ``: `&limit=${limit}`) +
      (sort === ''? ``: `&sort=${sort}`) +
      (order === ''? ``: `&order=${order}`)+
      (dto.nombres === ''? ``:dto.nombres.length <=3?``: `&nombres=${dto.nombres}`) +
      (dto.nroIdentificacion === ''? ``:dto.nroIdentificacion.length <=3?``: `&nroIdentificacion=${dto.nroIdentificacion}`)

      ).pipe();
    }

    /** DOWNLOAD PDF */
    getData(model: string):  Observable<any> {
      return this.http.get(`${this.url}/${model}`).pipe();
    }

    /** CATALOGOS */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
    getOptions(): Observable<any> {
        return this.http.get(`${this.url}/categoria_funcionario/options`).pipe();
    }

    //#region CRUD
      /** INSERT CON FORMDATA */
    create(model: string, data: any): Observable<any> {
        return this.http.post(`${this.url}/${model}`, data).pipe();
    }

    getBajas(model: string, id: number ):  Observable<any> {
      return this.http.get(`${this.url}/${model}/${id}`).pipe();
    }


    createBaja(model: string, form: FormData): Observable<any> {
      return this.http.post(`${this.url}/${model}`, form).pipe();
    }

    /** INSERT CON FORMDATA */
    insertModel(model: string, data: any): Observable<any> {
      return this.http.post(`${this.url}/${model}`, data).pipe();
    }

   /** INSERT SIMPLE */
    createSimple(model: string, data: any): Observable<any> {
        return this.http.post(`${this.url}/${model}`,data).pipe();
    }

   /** MODIFICACION CON FORMDATA */
    update(model: string, id: number, data: any, file: FormData): Observable<any> {
        return this.http.put(`${this.url}/${model}/${id}`, file).pipe();
    }

   /** ELIMINACION LOGICA */
    delete(model: string, id: number): Observable<any> {
        return this.http.delete(`${this.url}/${model}/${id}`);
    }

    //#endregion

    formatDate(date:Date) {
      const dateFormat = new Date(date);
         return dateFormat.getFullYear() + '-' + (dateFormat.getMonth()+1) + '-' + dateFormat.getDate();
    }
}
