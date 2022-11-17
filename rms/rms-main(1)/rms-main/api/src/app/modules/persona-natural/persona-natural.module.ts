import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PersonaNatural } from './entities';
import { PersonaNaturalController } from './persona-natural.controller';
import { PersonaNaturalService } from './persona-natural.service';
import { EmpresaModule } from '../empresa/empresa.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaNatural]), EmpresaModule],
  controllers: [PersonaNaturalController],
  providers: [PersonaNaturalService],
  exports: [PersonaNaturalService],
})
export class PersonaNaturalModule {}
