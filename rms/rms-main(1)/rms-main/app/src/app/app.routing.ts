import { Routes } from '@angular/router';
import { AuthGuard } from './authentication/guard/auth.guard';
import { Roles } from './authentication/guard/roles';
import { AppBlankComponent } from './shared/layouts/blank/blank.component';
import { FullComponent } from './shared/layouts/full/full.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    //canActivateChild: [AuthGuard],
    children: [
      {
          path: '',
          redirectTo: '/consultas',
          pathMatch: 'full'
      },
      {
        path: 'consultas',
        //canActivate: [AuthGuard],
        loadChildren: () => import('./pages/01-consultas/consultas.module').then(m => m.ConsultasModule)
      },
      {
        path: 'registros',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/02-registros/registros.module').then(m => m.RegistrosModule),
        data: { roles: [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios]}
      },
      //{
      //  path: 'empresa',
      //  //canActivate: [AuthGuard],
      //  //canActivate: [AdminGuard],
      //  loadChildren: () => import('./pages/03-admin/01-empresa/empresa.module').then(m => m.EmpresaModule)
      //},
      //{
      //  path: 'categoria_empresas',
      //  //canActivate: [AuthGuard],
      //  //canActivate: [AdminGuard],
      //  loadChildren: () => import('./pages/03-admin/02-categorias/categorias.module').then(m => m.CategoriasModule)
      //},
      //{
      //  path: 'catalogo',
      //  //canActivate: [AuthGuard],
      //  //canActivate: [AdminGuard],
      //  loadChildren: () => import('./pages/03-admin/03-catalogo/catalogo.module').then(m => m.CatalogoModule)
      //},

      //ADMINISTRATOR
      {
        path: 'empresa',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/03-admin/01-empresa/empresa.module').then(m => m.EmpresaModule),
        data: { roles: [Roles.Administrador]}
      },
      /*{
        path: 'categorias',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/03-admin/02-categorias/categorias.module').then(m => m.CategoriasModule),
        data: { roles: [Roles.Administrador]}
      },
      {
        path: 'catalogo',
        canActivate: [AuthGuard],
        loadChildren: () => import('./pages/03-admin/03-catalogo/catalogo.module').then(m => m.CatalogoModule),
        data: { roles: [Roles.Administrador]}
      },*/
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
