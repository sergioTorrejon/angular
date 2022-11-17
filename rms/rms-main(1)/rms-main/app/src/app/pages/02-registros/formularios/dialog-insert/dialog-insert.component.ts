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
  selector: 'app-dialog-insert',
  templateUrl: './dialog-insert.component.html',
  styleUrls: ['./dialog-insert.component.css'],
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
export class DialogInsertComponent implements OnInit  {

  //Formularios
  formGroupFuncionario: UntypedFormGroup;
  formGroupSearch: UntypedFormGroup;
  formGroupPersona: UntypedFormGroup;

  dataRow: any = [];

  dataOptions: any = [] ;
  file:any;

  disabled = false;

  nuevo = false;
  seleccionado = false;
  rowSelect:any = [];

  dataPersonas: any =[];
  count = 0;

  //sort
  sort: string = '';
  order: string = '';
  page = {
    length: 10,
    size: 10,
    index: 0
  };

  formSearch:any=
  {
    'nroIdentificacion':  [''],
    'nombres':  ['']
  };

  formPersona:any=
  {
    'nroIdentificacion':  ['', [Validators.required]],
    'PrimerNombrePersona':  ['', [Validators.required]],
    'SegundoNombrePersona':  [''],
    'PrimerApellidoPersona':  ['', [Validators.required]],
    'SegundoApellidoPersona': [''],
    'tipoIdentificacion': [null, [Validators.required]],
    'email': [''],
    'telefono': [null],
    'direccion':  [null],
  };

  formFuncionario:any=
  {
    'personaNatural':  [''],
    'tipoCargo':  [, [Validators.required]],
    'cargo':  ['', [Validators.required]],
    'fechaIngreso': [null, Validators.required],
    'ciudad':  ['', [Validators.required]],
    'nroContrato':  ['', [Validators.required]],
    'estado':  ['', [Validators.required]],

  };

  headersTable: any =
  [
    //FORMULARIO
    {name:'nro_identificacion', label:'Nro de Identificacion',  width:20},
    {name:'full_name', label:'Nombres y Apellidos', width:70},
  ];

  listCargos = [
    {value:"funcionario",label:'funcionario'},
    {value:"directivo",label:'Directivo'},
  ]

  optionEstado = [
    {value:"activo",label:'ACTIVO'},
    {value:"inactivo",label:'INACTIVO'},
  ]


  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogInsertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroupFuncionario =this.formBuilder.group(this.formFuncionario);
    this.formGroupSearch =this.formBuilder.group(this.formSearch);
    this.formGroupPersona =this.formBuilder.group(this.formPersona);
    this.rest.getOptions().subscribe((data:any) => {
      this.dataOptions = data.data;
      console.log('categoria_funcionario/options',this.dataOptions)
    });
  }


  ngOnInit( )
  {
    //this.rest.getOptions().
    //subscribe((data:any) => {
    //  this.dataOptions = data.data;
    //});
    console.log(this.dataPersonas.length)
    this.formOnchange();
  }

  formOnchange(){
    this.formGroupSearch.controls['nombres'].valueChanges.subscribe(async data => {
      this.dataTableUpdate(this.page)
    })
    this.formGroupSearch.controls['nroIdentificacion'].valueChanges.subscribe(async data => {
      this.dataTableUpdate(this.page)
    })
  }

  dataTableUpdate(event: any){
    this.page.size = event.pageSize !== undefined? event.pageSize: 10;
    this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
    const dto = (this.formGroupSearch).getRawValue()
    if(dto.nombres.length>3 || dto.nroIdentificacion.length>3){
      this.rest.getPersonas(dto,this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        const result = data.data
        this.dataPersonas = result.data;
        this.count = result.count;
      });
    }
    else{
      this.dataPersonas = [];
      this.count = 0;
    }

  }

  onSubmit(post:any) {
    console.log('POSTTTTTTTTTTT', post)
    this.rest.create('registros_funcionarios', post).
    subscribe((data:any) => {
      if (data.success === false) {
        this.openSnackBar(data.message,'','error')
      }
      else{
        this.close(data);
        this.dataTableUpdate(this.page)
      }
    });
  }

  onSubmitPersonas(post:any) {
    this.rest.insertModel('persona_natural', post).
    subscribe((result:any) => {
      if (result.success === true) {
        console.log(result.data,'RESULTTTT')
        this.openSnackBar(result.message,'','ok')
        this.nuevo = false
        this.select(result.data)
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }
    });
  }

  select(row:any){
    console.log(row)
    this.seleccionado = true
    this.rowSelect= row
    this.formGroupFuncionario.controls.personaNatural.setValue(this.rowSelect.id.toString())
    this.dataPersonas = []
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  close(data:any) {
    this.dialogRef.close(data);
  }
}
