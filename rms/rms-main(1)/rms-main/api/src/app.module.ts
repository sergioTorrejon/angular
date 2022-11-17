import { Module } from '@nestjs/common';
import {
  TypeOrmModule,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {
  CategoriaEmpresaModule,
} from './app/modules/admin/categorias/categoria-empresa/categoria-empresa.module';
import {
  CategoriaFuncionarioModule,
} from './app/modules/admin/categorias/categoria-funcionario/categoria-funcionario.module';
import {
  CategoriaPersonaModule,
} from './app/modules/admin/categorias/categoria-persona/categoria-persona.module';
import { EmpresaModule } from './app/modules/empresa/empresa.module';
import {
  PersonaNaturalModule,
} from './app/modules/persona-natural/persona-natural.module';
import {
  RegistrosFuncionariosModule,
} from './app/modules/registros-funcionarios/registros-funcionarios.module';
import {
  RegistrosBajasModule,
} from './app/modules/registros/registros-bajas/registros-bajas.module';
import {
  RegistrosHechosPosterioresModule,
} from './app/modules/registros/registros-hechos-posteriores/registros-hechos-posteriores.module';
import { DATABASE_CONFIG } from './config/config';
import { AuthModule } from './core/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(DATABASE_CONFIG as TypeOrmModuleOptions),
    AuthModule,
    CategoriaPersonaModule,
    CategoriaEmpresaModule,
    CategoriaFuncionarioModule,
    PersonaNaturalModule,
    EmpresaModule,
    RegistrosFuncionariosModule,
    RegistrosBajasModule,
    RegistrosHechosPosterioresModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
