import { Routes } from '@angular/router';

import { ConsultasComponent } from './consultas/consultas.component';
import { ControlComponent } from './control/control.component';
import { SupervisorComponent } from './supervisor/supervisor.component';


export const MaterialRoutes: Routes = [
  {
    path: 'consultas',
    component: ConsultasComponent
  },
  {
    path: 'control',
    component: ControlComponent
  },
  {
    path: 'supervisor',
    component: SupervisorComponent
  }
];
