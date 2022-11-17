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
export class CategoriaEmpresaService {
    private url: string = '';

    constructor (private http: HttpClient) {
        this.url = environment.api;
    }

    /** CARTAS RESOLUCIONES */
    /** DATA DOCUMENTOS PAGINADOS */
      getDocs(dto: any,page: number = 0,limit: number = 0,sort: string = '',order: string = ''):  Observable<any>
      {
        return this.http.get<any[]>(`${this.url}/${dto.model}?` +
        (page === 0? ``: `&page=${page}`) +
        (limit === 0? ``: `&limit=${limit}`) +
        (sort === ''? ``: `&sort=${sort}`) +
        (order === ''? ``: `&order=${order}`)
        ).pipe();
      }

          /** CATALOGOS */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
      getCategorias(model:any): Observable<any> {
        return this.http.get(`${this.url}//${model}/options`).pipe();
      }

    /** DOWNLOAD PDF */
      getData(model: string):  Observable<any> {
      return this.http.get(`${this.url}/${model}`).pipe();
      }

    /**TRAE DOCUMENTOS PAGINADOS */
      getNotificadosFilter(model: string,descripcion: string = ''):  Observable<any>
      {
        return this.http.get<any[]>(`${this.url}/${model}` +
        (descripcion === ''? ``: `?`) +
        (descripcion === ''? ``: `descripcion=${descripcion}`)
        ).pipe();
      }

    /** NOTIFICACIONES */
    /** TRAE NOTIFICACIONES POR CODIGO DE DOCUMENTOS */
      getNotificaciones(model: string, id: number = 0):  Observable<any> {
        return this.http.get(`${this.url}/${model}/getNotificaciones/${id}`).pipe();
      }

    /** CATALOGOS */
    /** TRAE LISTA DE OPCIONES DE CATALOGOS PARA SELECT */
      getOptions(): Observable<any> {
        return this.http.get(`${this.url}/categorias/options`).pipe();
      }

    //#region CRUD
      /** INSERT CON FORMDATA */
      create(model: string, data: any, file: FormData): Observable<any> {
        return this.http.post(`${this.url}/${model}`, file).pipe();
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
