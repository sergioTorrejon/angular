import { Injectable } from '@angular/core';
import { Roles } from 'src/app/authentication/guard/roles';

export interface BadgeItem {
    type: string;
    value: string;
}
export interface Saperator {
    name: string;
    type?: string;
}
export interface SubChildren {
    state: string;
    name: string;
    type?: string;
}
export interface ChildrenItems {
    state: string;
    name: string;
    role?: string[]; /* new */
    type?: string;
    child?: SubChildren[];
}

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    role?: string[]; /* new */
    badge?: BadgeItem[];
    saperator?: Saperator[];
    children?: ChildrenItems[];
}

const MENUITEMS: any =
[
  {
    state: 'consultas',
    name: 'Consultas',
    type: 'link',
    icon: 'manage_search',
    //role : [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios],
    children: []
  },
  {
    state: 'registros',
    name: 'Funcionarios',
    type: 'link',
    icon: 'manage_search',
    role : [Roles.Administrador, Roles.OperadorFuncionarios, Roles.AprobadorFuncionarios],
    children: []
  },
  {
    state: '',
    name: 'Administrador',
    type: 'sub',
    icon: 'settings',
    role : [Roles.Administrador],
    children: [
      { state: 'empresa', name: 'Empresas', type: 'link' },
      { state: 'categorias', name: 'Categorias', type: 'link' },
      { state: 'catalogo', name: 'Catalogos', type: 'link' },
    ]
  }
];

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}
