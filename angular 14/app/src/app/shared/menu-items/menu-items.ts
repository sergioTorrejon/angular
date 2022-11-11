import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  role?: string[] | string; /* new */
  icon: string;
}

const MENUITEMS = [
  
//ADMIN
  { 
    name: 'Admin', 
    state: 'admin', 
    type: 'link',
    role : ['administrador'], 
    icon: 'crop_7_5' 
  },
  
//INICIAL
  { 
    name: 'Inicio', 
    state: 'inicio',
    type: 'link', 
    role : ['administrador'], 
    icon: 'av_timer' 
  },
  
//CONSULTA
  { 
    name: 'Consultas', 
    state: 'consultas', 
    type: 'link',
    role : ['consulta'], 
    icon: 'view_comfy' 
  },
  
//OPERADOR
  { 
    name: 'Control', 
    state: 'control', 
    type: 'link',
    role : ['operador'], 
    icon: 'view_list' 
  },
    
//SUPERVISOR
  { 
    name: 'Supervisor',
    state: 'supervisor', 
    type: 'link', 
    role : ['supervisor'], 
    icon: 'view_headline' 
  }
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
