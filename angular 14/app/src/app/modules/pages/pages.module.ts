import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './pages.routing';

import { ConsultasComponent } from './consultas/consultas.component';
import { ControlComponent } from './control/control.component';
import { SupervisorComponent } from './supervisor/supervisor.component';
import { AppMaterialModule } from 'src/app/app-material-module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    AppMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  entryComponents: [],
  declarations: [
    ConsultasComponent,
    ControlComponent,
    SupervisorComponent
    
  ]
})
export class MaterialComponentsModule {}
