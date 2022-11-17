import {
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
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
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { RegistrosService } from '../../registros.service';

@Component({
  selector: 'app-dialog-baja-insert',
  templateUrl: './dialog-baja-insert.component.html',
  styleUrls: ['./dialog-baja-insert.component.css'],
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
export class DialogBajaInsertComponent implements OnInit  {
 //prueba

  //Formularios
  formGroup: UntypedFormGroup;
  formGroupNotificacion: UntypedFormGroup;

  dataRow: any = [];
  dataNotificaciones: any = [];

  dataOptions: any = [] ;
  file:any;

  disabledNotificaciones = false;
  disabled = false;

  causalBaja = [
    {value:"1",label:'BAJA 1'},
    {value:"2",label:'BAJA 2'},
    {value:"3",label:'BAJA 3'},
    {value:"4",label:'BAJA 4'}
  ]


  causalHechoPosterior = [
    {value:"1",label:'HECHO POSTERIOR 1'},
    {value:"2",label:'HECHO POSTERIOR 2'},
    {value:"3",label:'HECHO POSTERIOR 3'},
    {value:"4",label:'HECHO POSTERIOR 4'}
  ]

  optionEstado = [
    {value:"proceso",label:'En PROCESO'},
    {value:"definitivo",label:'DEFINITIVO'},
  ]

  inputNotificados:string=''

  nameFileValidation:any={numero:'',fecha:'',tipo:'', val:'', status:''};

  dataAutoComplete: any =[] ;

  formControl:any=
  {
    'funcionario':  [,[Validators.required]],
    'categoriaBaja':  ['', [Validators.required]],
    'fechaBaja': [null, Validators.required],
    'nroBaja': [null, [Validators.required , Validators.minLength(4), Validators.maxLength(4)]],
    'comentarios': ['', [ Validators.minLength(2), Validators.maxLength(2000)]],
    'hechosPosteriores': ['']
  };

  formControlNotificaciones:any=
  {
    'causal':  [null, [Validators.required]],
    'fecha': [null, Validators.required],
    'descripcion':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
    'estado': [null, [Validators.required]],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogBajaInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
  }


  ngOnInit( )
  {
    console.log(this.data.data.id)
    //this.rest.getOptions().
    //subscribe((data:any) => {
    //  this.dataOptions = data.data;
    //});
    this.formGroup.controls['funcionario'].setValue(this.data.data.id.toString());
    console.log(this.formGroup)

    this.formOnchange();
  }

  formOnchange(){

  }

  deleteRow(rowSelect: any) {
    var i = this.dataNotificaciones.indexOf( rowSelect );
    this.dataNotificaciones.splice( i, 1 );
  }

  saveNotificaciones(data:any) {
    this.dataNotificaciones.push(data);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
    //this.getAutoComplete();
  }


  valNotificados(event: any){
    this.inputNotificados = event;
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  onSubmit(post:any) {
    post.hechosPosteriores=  JSON.stringify(this.dataNotificaciones)
    console.log('POST',post)
    this.rest.create('registros_bajas', post).
    subscribe((data:any) => {
      if (data.status === 'error') {
        this.openSnackBar(data.message,'','error')
      }
      else{
        this.close(data);
      }
    });
  }

  close(data:any) {
    this.dialogRef.close(data);
  }
}
