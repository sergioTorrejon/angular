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
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Words } from 'src/app/models/words';

import { CategoriaEmpresaService } from '../categoria-empresa.service';

@Component({
  selector: 'app-dialog-update',
  templateUrl: './dialog-update.component.html',
  styleUrls: ['./dialog-update.component.css'],
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
export class DialogUpdateComponent implements OnInit {

  //Palabras Internacionalizadas
  _words = Words;
  //Formularios
  formGroup: UntypedFormGroup;
  formGroupNotificacion: UntypedFormGroup;

  dataRow: any = [];
  dataNotificaciones: any = [];

  disabledNotificaciones = false;
  disabled = false;

  dataAutoComplete: any =[] ;

  setFecha:any;

  nameFileValidation:any={numero:'',fecha:'',tipo:'', val:'', status:''};

  dataOptions: any = [] ;
  file:any;
  //fileUpload: ElementRef;

  publicar: any =
  [
    {value:true , label:'Publicar'},
    {value:false , label:'No publicar'},
  ];

  formControl:any=
  {
    'rc_inten':  [null, [Validators.required]],
    'rc_tipo':  [null, [Validators.required]],
    'rc_mercado':  [null, [Validators.required]],
    'rc_subtipo':  [null, [Validators.required]],
    'rc_publicar_web': [true, [Validators.required]],
    'rc_numero': [null, [Validators.required , Validators.minLength(4), Validators.maxLength(4)]],
    'rc_alfa': ['', [Validators.maxLength(1)]],
    'rc_fecha': [null, Validators.required],
    'rc_titulo':  [null, [Validators.required , Validators.minLength(2), Validators.maxLength(1000)]],
    'rc_comentarios': ['', [ Validators.minLength(2), Validators.maxLength(2000)]],
    'rc_filename':  [''],
    'etapa':  ['CREADO'],
    'derivado': [''],
  };

  formControlNotificaciones:any=
  {
    'id':  [0, [Validators.required]],
    'rc_id':  [0, [Validators.required]],
    't_ciudad':  [null, [Validators.required]],
    't_fecha': [null, Validators.required],
    't_hora':  [null, [Validators.required]],
    't_aquien':  [null, [Validators.minLength(2), Validators.maxLength(300)]],
    't_atraves': ['REPRESENTANTE LEGAL', [Validators.required , Validators.minLength(2), Validators.maxLength(300)]],
    'estado':  [true, [Validators.required]],
  };

  constructor
  (
    private formBuilder: UntypedFormBuilder,
    private dialogRef: MatDialogRef<DialogUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public rest: CategoriaEmpresaService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar

  )
  {
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
  }

  async ngOnInit( )
  {
    console.log(this.data)
    this.rest.getNotificaciones('notificaciones',this.data.data.id).
    subscribe((data:any) => {
      this.dataNotificaciones = data.data;
    });


    this.rest.getOptions().
    subscribe((data:any) => {
      this.dataOptions = data.data;
      console.log(this.dataOptions);
    });
    this.formControl=
    {
      rc_inten:  [this.data.data.rc_inten, [Validators.required]],
      rc_tipo:  [this.data.data.rc_tipo, [Validators.required]],
      rc_mercado:  [this.data.data.rc_mercado, [Validators.required]],
      rc_subtipo:  [this.data.data.rc_subtipo, [Validators.required]],
      rc_publicar_web: [this.data.data.rc_publicar_web, [Validators.required]],
      rc_numero: [this.data.data.rc_numero, [Validators.required , Validators.minLength(4), Validators.maxLength(4)]],
      rc_alfa: [this.data.data.rc_alfa, [Validators.maxLength(1)]],
      rc_fecha: [this.data.data.rc_fecha, Validators.required],
      rc_titulo:  [this.data.data.rc_titulo, [Validators.required , Validators.minLength(2), Validators.maxLength(1000)]],
      rc_comentarios: [this.data.data.rc_comentarios, [Validators.minLength(2), Validators.maxLength(2000)]],
      rc_filename:  [this.data.data.rc_filename],
      derivado:  [''],
    };
    this.setFecha = this.formatDate(this.data.data.rc_fecha)
    this.nameFileValidation.tipo=this.data.data.rc_tipo
    this.nameFileValidation.numero = this.data.data.rc_numero;
    this.nameFileValidation.fecha = ((new Date(this.data.data.rc_fecha)).getFullYear()).toString().substring(2,4);
    this.validationNameFile()
    this.formGroup =this.formBuilder.group(this.formControl);
    this.formOnchange();
    this.getNotificados();
    this.formGroup.controls['rc_subtipo'].disable();
    this.formGroup.controls['rc_alfa'].disable();

    if (this.data.data.rc_tipo=='RA')
    {
      this.formGroup.controls['rc_subtipo'].enable();
      this.disabledNotificaciones = true
    }


    this.formGroup.controls['rc_tipo'].valueChanges.subscribe(async data => {
      this.disabledNotificaciones = true
      this.dataNotificaciones=[];
      this.formGroup.controls['rc_subtipo'].enable();
      if (data!='RA'){
        this.disabledNotificaciones = false;
        this.formGroup.controls['rc_subtipo'].disable();
        this.formGroup.controls['rc_subtipo'].setValue('');
      }
    })
    this.formGroup.controls['rc_numero'].disable();
    this.formGroup.controls['rc_inten'].disable();
    this.formGroup.controls['rc_tipo'].disable();
    //this.formGroup.controls['rc_mercado'].disable();
    this.formGroupNotificacion.controls['t_aquien'].valueChanges.subscribe(async data => {
      console.log(data)
      this.rest.getNotificadosFilter('notificados',data).
      subscribe((data:any) => {
        this.dataAutoComplete = data;
        console.log(data)
      });
    })

  }

  onSelectFile(event: any) {
    this.file = event.target.files[0];
    const fileName = this.file.name.substring(0,10);
    if (fileName==this.nameFileValidation.val)
    {
      this.formGroup.controls.rc_filename.setValue(this.file.name)
      this.nameFileValidation.status='valido';
    }
    else{
      this.openSnackBar('Nombre de Archivo Invalido: '+this.file.name,'','error')
      this.clearFile();
    }
  }

  clearFile(){
    this.file='';
    this.formGroup.controls.rc_filename.setValue('')
    this.nameFileValidation.status='invalido';
  }

  formOnchange(){
    this.formGroup.controls['rc_tipo'].valueChanges.subscribe(async data => {
      this.nameFileValidation.tipo = data;
      this.validationNameFile()
    })
    this.formGroup.controls['rc_numero'].valueChanges.subscribe(async data => {
      this.nameFileValidation.numero = data;
      this.validationNameFile()
    })
    this.formGroup.controls['rc_fecha'].valueChanges.subscribe(async data => {
      this.nameFileValidation.fecha = ((new Date(data)).getFullYear()).toString().substring(2,4);
      this.validationNameFile()
    })
  }

  validationNameFile(){
    this.nameFileValidation.val='';
    this.nameFileValidation.status='';
    const nameVal = this.nameFileValidation.numero+'-'+this.nameFileValidation.fecha+'-'+this.nameFileValidation.tipo;
    if (nameVal.length==10)
    {
      this.nameFileValidation.val=nameVal;
      this.formGroup.controls['rc_filename'].enable();
    }
    if(this.nameFileValidation.val!=this.formGroup.controls.rc_filename.value.substring(0,10)
    &&this.formGroup.controls.rc_inten.value == 'PS')
    {
      this.formGroup.controls.rc_filename.setValue('')
    }
  }

  deleteRow(rowSelect: any) {
    var i = this.dataNotificaciones.indexOf( rowSelect );
    if (rowSelect.id!=0){
      this.rest.delete('notificaciones', rowSelect.id).
      subscribe((data:any) => {
      });
    }
    this.dataNotificaciones.splice( i, 1 );
  }

  saveNotificaciones(data:any) {
    this.dataNotificaciones.push(data);
    this.formGroupNotificacion =this.formBuilder.group(this.formControlNotificaciones);
  }

  onSubmit(post:any) {
    const formData = new FormData();
    formData.append('file', this.file);
    for (let i in post) {
      formData.append(i, post[i]);
    }
    formData.append('notificaciones', JSON.stringify(this.dataNotificaciones));
    this.rest.update('cartas_resoluciones', this.data.data.id, post, formData).
    subscribe((data:any) => {
      this.dataRow = data.data;
      console.log(this.dataRow, data)
      this.close('confirm');
    });
  }

  enableAlpha(event: any) {
    this.formGroup.controls['rc_alfa'].enable();
    if (!event)
    {
      this.formGroup.controls['rc_alfa'].disable();
      this.formGroup.controls['rc_alfa'].setValue('')
    }
    this.formGroup.controls['rc_alfa'].setValue('')
    console.log (event)
  }

  getAutoComplete() {
    this.rest.getData('notificados').
    subscribe((data:any) => {
      this.dataOptions = data.data;
      console.log(data)
    });
  }

  getNotificados(){
    this.rest.getNotificadosFilter('notificados').
    subscribe((data:any) => {
      this.dataAutoComplete = data;
    });
  }

  close(state:string) {
    this.dialogRef.close(state);
  }

//SNACKBAR
  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }

  formatDate(date:Date) {
    const dateFormat = new Date(date);
       const auxMax = dateFormat.getFullYear() + '-12-31';
       const auxMin = dateFormat.getFullYear() + '-01-31';
       const max =  new Date(auxMax);
       const min =  new Date(auxMin);
       return {max:max,min:min}
  }
}