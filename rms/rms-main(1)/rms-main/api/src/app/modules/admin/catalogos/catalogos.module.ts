import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatalogosController } from './catalogos.controller';
import { CatalogosService } from './catalogos.service';
import { Catalogos } from './entities/catalogos.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Catalogos])],
  controllers: [CatalogosController],
  providers: [CatalogosService],
})
export class CatalogosModule {}
