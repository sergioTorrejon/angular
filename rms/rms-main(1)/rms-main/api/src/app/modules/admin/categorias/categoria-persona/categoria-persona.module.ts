import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoriaPersonaController } from './categoria-persona.controller';
import { CategoriaPersonaService } from './categoria-persona.service';
import { CategoriaPersona } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaPersona])],
  controllers: [CategoriaPersonaController],
  providers: [CategoriaPersonaService],
  exports: [CategoriaPersonaService],
})
export class CategoriaPersonaModule {}
