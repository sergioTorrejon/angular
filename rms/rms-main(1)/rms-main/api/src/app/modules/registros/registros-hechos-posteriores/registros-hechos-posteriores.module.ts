import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegistrosHechosPosteriores } from './entities';
import {
  RegistrosHechosPosterioresController,
} from './registros-hechos-posteriores.controller';
import {
  RegistrosHechosPosterioresService,
} from './registros-hechos-posteriores.service';

@Module({
  imports: [TypeOrmModule.forFeature([RegistrosHechosPosteriores])],
  controllers: [RegistrosHechosPosterioresController],
  providers: [RegistrosHechosPosterioresService],
  exports: [RegistrosHechosPosterioresService],
})
export class RegistrosHechosPosterioresModule {}
