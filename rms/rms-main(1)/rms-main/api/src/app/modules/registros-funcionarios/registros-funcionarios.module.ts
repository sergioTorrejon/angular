import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpresaModule } from '../empresa/empresa.module';

import { RegistrosFuncionarios } from './entities';
import {
  RegistrosFuncionariosController,
} from './registros-funcionarios.controller';
import { RegistrosFuncionariosService } from './registros-funcionarios.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrosFuncionarios]), EmpresaModule],
  controllers: [RegistrosFuncionariosController],
  providers: [RegistrosFuncionariosService],
  exports: [RegistrosFuncionariosService],
})
export class RegistrosFuncionariosModule {}
