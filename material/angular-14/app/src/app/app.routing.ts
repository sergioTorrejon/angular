import { Routes } from '@angular/router';
import { AuthGuard } from './authentication/guard/auth.guard';
import { AppBlankComponent } from './shared/layouts/blank/blank.component';

import { FullComponent } from './shared/layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    //canActivate: [AuthGuard],
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/inicio',
        pathMatch: 'full'
      },
      {
        path: '',
        loadChildren:
          () => import('./modules/pages/pages.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'admin',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./modules/admin/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'inicio',
        loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)
      }

    ]
  },
  {
    path: '',
    component: AppBlankComponent,
      children: [
        {
            path: 'authentication',
            loadChildren:
                () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
        }
      ]
  },
  {
      path: '**',
      redirectTo: 'authentication/404'
  }
];
