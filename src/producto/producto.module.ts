import { Module } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { ProductoController } from './producto.controller';
import { NeoPool } from '../pg.pool';

@Module({
  controllers: [ProductoController],
  providers: [ProductoService, NeoPool],
})
export class ProductoModule {}
