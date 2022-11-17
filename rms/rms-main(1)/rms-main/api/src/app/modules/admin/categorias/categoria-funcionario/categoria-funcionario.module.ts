import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  CategoriaFuncionarioController,
} from './categoria-funcionario.controller';
import { CategoriaFuncionarioService } from './categoria-funcionario.service';
import { CategoriaFuncionario } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaFuncionario])],
  controllers: [CategoriaFuncionarioController],
  providers: [CategoriaFuncionarioService],
  exports: [CategoriaFuncionarioService],
})
export class CategoriaFuncionarioModule {}
