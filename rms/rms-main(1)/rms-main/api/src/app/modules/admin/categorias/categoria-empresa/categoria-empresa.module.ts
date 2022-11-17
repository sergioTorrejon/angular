import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriaEmpresaController } from './categoria-empresa.controller';
import { CategoriaEmpresaService } from './categoria-empresa.service';
import { CategoriaEmpresa } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaEmpresa])],
  controllers: [CategoriaEmpresaController],
  providers: [CategoriaEmpresaService],
  exports: [CategoriaEmpresaService],
})
export class CategoriaEmpresaModule {}
