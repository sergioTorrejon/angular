import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
  MAT_MOMENT_DATE_FORMATS,
  MomentDateAdapter,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  AuthenticationService,
} from 'src/app/authentication/services/authentication.service';

import {
  AuthorizationService,
} from '../../authentication/services/authorization.service';
import { ConsultasService } from './consultas.service';
import {
  DialogAprobadoComponent,
} from './dialog-aprobado/dialog-aprobado.component';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-BO'},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
})
export class ConsultasComponent implements OnInit {

  // Variables del Formulario
  formGroup: UntypedFormGroup;
  formControl:any=
  {
    model:['cartas_resoluciones'],
    modulo:[''],
    entidad:['PS'],
    year:['0'],
    tipo:[''],
    subtipo:[''],
    mercado:[''],
    numero:[''],
    titulo:[''],
    del:[''],
    al:[''],
  };

  //Pagination and Sort
  //sort
  sort: string = '';
  order: string = '';
  // Pagination Table
  page = {
    size: 10,
    index: 0,
  };

  // Data
  data: any ;
  count = 0;
  dataOptions: any = [];

  //Congif Table
  headersTable: any =
  [
    {name:'rc_inten', label:'Institución', width:15},
    {name:'rc_tipo', label:'Documento',  width:10},
    {name:'rc_subtipo', label:'Tipo Resolución',  width:10},
    {name:'rc_numero', label:'Número',  width:7},
    {name:'rc_fecha', label:'Fecha',  width:8},
    {name:'rc_titulo', label:'Título / Referencia', width:45},
  ];


  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest: ConsultasService,
    public authorizationService: AuthorizationService,
    private authenticationService: AuthenticationService,
    private _snackBar: MatSnackBar
    ) {
      //this.formGroup =this.formBuilder.group([]);
    }

  ngOnInit() {
    //this.setForm();
    const usuario = this.authenticationService.GetUser()
    console.log('USUARIO',usuario)
    //this.getParams();
  }

}
