import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ChartistModule } from 'ng-chartist';

import { AppMaterialModule } from '../app-material-module';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import {
  MessageBoxComponent,
} from './dialogs/message-box/message-box.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
    declarations: [
        //Messages
        MessageBoxComponent,
        //Spinner
        SpinnerComponent,
        //modals
        //tables
        //panels
        //searchs
        //forms
        //Crud
        //Brudcrumbs
        BreadcrumbsComponent,
    ],
    exports: [
        //Messages
        MessageBoxComponent,
        //Spinner
        SpinnerComponent,
        //modals
        //tables
        //panels
        //searchs
        //forms
        //Crud
       //Brudcrumbs
       BreadcrumbsComponent,
    ],
    imports: [
        FlexLayoutModule,
        CommonModule,
        ChartistModule,
        MatDialogModule,
        MatButtonToggleModule,
        FormsModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
        MatSortModule,
        MatTableModule,
        MatToolbarModule,
        MatPaginatorModule,
        AppMaterialModule,
        MatListModule,
        MatDatepickerModule,
        ReactiveFormsModule,
    ]
})
export class ComponentsModule {}
