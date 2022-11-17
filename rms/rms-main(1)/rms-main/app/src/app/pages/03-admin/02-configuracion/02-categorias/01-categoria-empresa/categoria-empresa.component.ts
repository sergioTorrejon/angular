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
  AuthorizationService,
} from 'src/app/authentication/services/authorization.service';
import {
  MessageBoxComponent,
} from 'src/app/components/dialogs/message-box/message-box.component';

import { CategoriaEmpresaService } from './categoria-empresa.service';
import { DialogInsertComponent } from './dialog-insert/dialog-insert.component';
import { DialogUpdateComponent } from './dialog-update/dialog-update.component';

@Component({
  selector: 'app-categoria-empresa',
  templateUrl: './categoria-empresa.component.html',
  styleUrls: ['./categoria-empresa.component.css'],
})
export class CategoriaEmpresaComponent implements OnInit {

  isAdmin = true

  model = {
    name:'categoria-empresa',
    title:'CATEGORIAS EMPRESA'
  }

  // Variables del Formulario
  formGroup: UntypedFormGroup;
  formControl:any=
  {
    model:['categoria_persona'],
    entidad:['PS'],
    modulo:['CATEGORIAS'],
    etapa:['categoria_persona'],
    subtipo:[''],
  };

  //sort
  sort: string = '';
  order: string = '';

  //table
  data: any ;
  count = 0;
  dataCategorias: any = [];
  dataOptions: any = [];
  page = {
    length: 10,
    size: 10,
    index: 0,
  };


  headersTable: any =
  [
    //FORMULARIO
    {name:'categoria', label:'Categoria',  width:15},
    {name:'codigo', label:'Sub-Categoria',  width:19},
    {name:'descripcion', label:'Nombre',  width:8},
  ];

  estado: any =
  [
    //FORMULARIO
    {value:'categoria_persona', label:'CATEGORIA PERSONAS'},
    {value:'categoria_empresa', label:'CATEGORIA EMPRESAS'},
    {value:'categoria_registros', label:'CATEGORIA REGISTROS'},
  ];

  constructor(
    private formBuilder: UntypedFormBuilder,
    private dialog: MatDialog,
    public rest:  CategoriaEmpresaService,
    public authorizationService: AuthorizationService,
    private _snackBar: MatSnackBar
    ) {

      this.formGroup =this.formBuilder.group([]);
    }

  ngOnInit() {
    //this.getCategorias();
    this.setForm();
      //this.getParams();
  }

  setForm(){

      this.formGroup =this.formBuilder.group(this.formControl);

      this.formOnchange();
      //this.dataTableUpdate(this.page);
  }

/*   getCategorias(){
    this.rest.getCategorias().subscribe(async (data:any) =>{
      this.dataCategorias = data.data;
      this.formGroup.controls['subtipo'].setValue(this.dataCategorias[0].value);
    });
  } */

  getParams(){
      this.rest.getOptions().subscribe((data:any) => {
        this.dataOptions = data.data;
      });
  }

  formOnchange(){

      this.formGroup.valueChanges.subscribe(async data => {
        const dto = (this.formGroup).getRawValue();
        //this.dataTableUpdate(this.page);
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
      const dto = (this.formGroup).getRawValue();
      this.rest.getDocs(dto,this.page.index+1, this.page.size,this.sort, this.order)
      .subscribe((data:any) => {
        this.data = data.data;
        this.count = data.count;
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
      if (result.status === 'success') {
        this.openSnackBar(result.message,'','ok')
        this.dataTableUpdate({ pageSize: 10, pageIndex: 0 });
      }
      if (result.status === 'error') {
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
    let dialogRef = this.dialog.open(DialogUpdateComponent, dialogConfig);
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

}

