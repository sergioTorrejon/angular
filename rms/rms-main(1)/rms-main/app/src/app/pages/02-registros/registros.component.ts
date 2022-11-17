import {
  Component,
  OnInit,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
} from '@angular/forms';
import {
  MatDialog,
  MatDialogConfig,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  MessageBoxComponent,
} from 'src/app/components/dialogs/message-box/message-box.component';

import {
  AuthorizationService,
} from '../../authentication/services/authorization.service';
import {
  DialogBajaInsertComponent,
} from './formularios/dialog-baja-insert/dialog-baja-insert.component';
import {
  DialogBajaUpdateComponent,
} from './formularios/dialog-baja-update/dialog-baja-update.component';
import {
  DialogHechosPosterioesComponent,
} from './formularios/dialog-hechos-posteriores/dialog-hechos-posteriores.component';
import {
  DialogInsertComponent,
} from './formularios/dialog-insert/dialog-insert.component';
import { RegistrosService } from './registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css'],
})
export class RegistrosComponent implements OnInit {

  // Variables del Formulario
  formGroup: UntypedFormGroup;
  formControl:any=
  {
    model:['registros_funcionarios'],
    estado:[''],
    tipoFuncionario:[''],
    fechaIngreso:[''],
    nroIdentificacion:[''],
    nombres:[''],
    apellidos:[''],
  };


  optionFuncionario = [
    {value:"funcionario",label:'funcionario'},
    {value:"directivo",label:'Directivo'},
  ]

  optionEstado = [
    {value:"ACTIVO",label:'ACTIVO'},
    {value:"INACTIVO",label:'INACTIVO'},
  ]

  //table
  data: any ;
  count = 0;
  dataOptions: any = [];
  //sort
  sort: string = '';
  order: string = 'desc';
  page = {
    length: 10,
    size: 10,
    index: 0
  };


  columns: any =
  [
    //FORMULARIO
    {name:'nro_identificacion', label:'Nro. Identificación',  width:10},
    {name:'primer_nombre', label:'Nombres',  width:10},
    {name:'primer_apellido', label:'Primer Apellido',  width:10},
    {name:'segundo_apellido', label:'Segundo Apellido',  width:10},
    {name:'tipo_cargo', label:'Tipo de Cargo',  width:10},
    {name:'fecha_ingreso', label:'Fecha de ingreso',  width:10},
    {name:'cargo', label:'Cargo',  width:10},
    {name:'estado', label:'Estado', width:10},
  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest: RegistrosService,
    public authorizationService: AuthorizationService,
    private _snackBar: MatSnackBar
    ) {
      this.formGroup =this.formBuilder.group([]);
      this.rest.getOptions().subscribe((data:any) => {
        this.dataOptions = data.data;
        console.log('categoria_funcionario/options',this.dataOptions)
      });
    }

  ngOnInit() {
      this.setForm();


      console.log('categoria_funcionario/options',this.dataOptions)
      //this.getParams();
  }

  setForm(){
      this.formGroup =this.formBuilder.group(this.formControl);
      //this.formOnchange();
      this.dataTableUpdate(this.page);
  }

  getParams(){
      this.rest.getOptions().subscribe((data:any) => {
        this.dataOptions = data.data;
      });
  }

  formOnchange(){
      this.formGroup.valueChanges.subscribe(async data => {
        this.dataTableUpdate(this.page);
      })
/*       this.formGroup.controls['tipo'].valueChanges.subscribe(async data => {
        this.formGroup.controls['subtipo'].enable();

        if (data!='RA'){
          this.formGroup.controls['subtipo'].disable();
          this.formGroup.controls['subtipo'].setValue('');
        }
      }) */
  }

  sortData(event:any){
      this.sort = event.active;
      this.order = event.direction;
      if (this.order == ""){
        this.sort = 'id';
      }
      this.dataTableUpdate(this.page);
  }

  dataTableUpdate(event: any){
      this.page.size = event.pageSize !== undefined? event.pageSize: 10;
      this.page.index = event.pageIndex !== undefined? event.pageIndex: 0;
      this.rest.getFuncionarios((this.formGroup).getRawValue(),this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        const result = data.data
        this.data = result.data;
        this.count = result.count;
      });
  }

  insertRow()
  {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
    };
    let dialogRef = this.dialog.open(DialogInsertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result:any) => {
      if (result.success === true) {
        this.openSnackBar(result.message,'','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }

    });
  }

  updateRow(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
    };
     let dialogRef = this.dialog.open(DialogBajaUpdateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.openSnackBar('Se ACTUALIZO el registro correctamente','','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
    });
  }

  insertBaja(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
    };
     let dialogRef = this.dialog.open(DialogBajaInsertComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dataTableUpdate(this.page);
      console.log('RRRREEESULLLT',result)
      if (result.success === true) {
        this.openSnackBar(result.message,'','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }
    });
  }

  updateBaja(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
    };
     let dialogRef = this.dialog.open(DialogBajaUpdateComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      this.dataTableUpdate(this.page);
      console.log('RRRREEESULLLT',result)
      if (result.success === true) {
        this.openSnackBar(result.message,'','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
      if (result.success === false) {
        this.openSnackBar(result.message,'','error')
      }
    });
  }

  registroHEchoPosterior(rowSelect: any) {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.width = '1200px';
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      data: rowSelect
    };
     let dialogRef = this.dialog.open(DialogHechosPosterioesComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        this.openSnackBar('Se ACTUALIZO el registro correctamente','','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
    });
  }

  deleteRow(rowSelect: any) {
    let dialogMessage = this.dialog.open(MessageBoxComponent, {
      disableClose: true,
      autoFocus: true,
      data: {
        cancelarBtn: true,
        aceptarBtn: true,
        titulo: 'Mensaje',
        descripcion: 'Se eliminara el registro Seleccionado',
      },
    });
    dialogMessage.afterClosed().subscribe((result1) => {
      if (result1 === 'confirm') {
        this.rest.delete(this.formGroup.controls.model.value, rowSelect.id)
        .subscribe((data: any) => {
          this.openSnackBar('Se eliminó el registro correctamente','','warning')
          this.dataTableUpdate({ pageSize: 10, pageIndex: 0, sort: '' });
        });
      }
    });
  }

  openSnackBar(message: string, action: string, type:string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [type]
    })
  }


}

