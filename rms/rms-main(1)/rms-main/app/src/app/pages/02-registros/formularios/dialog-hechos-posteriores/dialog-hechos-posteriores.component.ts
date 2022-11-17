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
  selector: 'app-dialog-hechos-posteriores',
  templateUrl: './dialog-hechos-posteriores.component.html',
  styleUrls: ['./dialog-hechos-posteriores.component.css'],
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
export class DialogHechosPosterioesComponent implements OnInit  {

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
    'empresa':  ['341981a8-11a3-49d7-aa66-444ff4519844'],
    'cargo':  ['', [Validators.required]],
    //'fechaIngreso':  ['', [Validators.required]],

  };

  headersTable: any =
  [
    //FORMULARIO
    {name:'primer_nombre', label:'Codigo',  width:10},
    {name:'segundo_nombre', label:'Nombres',  width:20},
    {name:'primer_apellido', label:'Apellidos',  width:20},
    {name:'segundo_apellido', label:'Cargo', width:40},
  ];


  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogHechosPosterioesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: RegistrosService,
    private _snackBar: MatSnackBar
  )
  {
    this.formGroupFuncionario =this.formBuilder.group(this.formFuncionario);
    this.formGroupSearch =this.formBuilder.group(this.formSearch);
    this.formGroupPersona =this.formBuilder.group(this.formPersona);
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
    this.formGroupFuncionario.controls.personaNatural.setValue(this.rowSelect.id)
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
