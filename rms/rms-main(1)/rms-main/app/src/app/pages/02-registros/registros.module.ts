import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';

import { PdfViewerModule } from 'ng2-pdf-viewer';
import { AppMaterialModule } from 'src/app/app-material-module';
import { ComponentsModule } from 'src/app/components/components.module';

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
import {
  DialogRectificacionComponent,
} from './formularios/dialog-rectificacion/dialog-rectificacion.component';
import { RegistrosComponent } from './registros.component';

@NgModule({
    declarations: [
      RegistrosComponent,
      DialogInsertComponent,
      DialogBajaUpdateComponent,
      DialogBajaInsertComponent,
      DialogRectificacionComponent,
      DialogHechosPosterioesComponent
    ],
    exports: [],
    bootstrap: [RegistrosComponent],
    imports: [
        ReactiveFormsModule,
        PdfViewerModule,
        FormsModule,
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        MatTableModule,
        MatSortModule,
        AppMaterialModule,
        ComponentsModule,
        RouterModule.forChild([
            {
                path: '',
                component: RegistrosComponent
            },
        ])
    ]
})
export class RegistrosModule { }
