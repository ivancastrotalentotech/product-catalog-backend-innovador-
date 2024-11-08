import { Injectable, Logger } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';

import { findAll }  from '../common/query/catalogos-productos';
import { NeoPool  } from '../pg.pool';

@Injectable()
export class ProductoService {

  private readonly logger = new Logger('ProductoService');

  constructor(
    private readonly neoPool: NeoPool,
  ){}


  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
  }

  async findAll() {

    try {

      this.logger.debug(`Consultando Base de DATOS`);
      const { rows  } =  await this.neoPool.query(findAll);  
      this.logger.debug(`Respuesta: ${JSON.stringify(rows)}`);

      return {
        status: 'success',
        message: 'Productos recuperados exitosamente',
        data: rows,
      };     
    } catch (error) {
      this.logger.error('Error consultando productos', error.stack);
      return {
        status: 'error',
        message: 'Error consultando productos',
        error: error.message,
        data: []
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} producto`;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {

    try {
      
      this.logger.debug(`Editando Producto id: ${id}`);
      return {
        status: 'success',
        message: 'Productos editado exitosamente',
        data: id,
      };
    } catch (error) {
      this.logger.error('Error consultando productos', error.stack);
      return {
        status: 'error',
        message: 'Error consultando productos',
        error: error.message,
        data: []
      };      
    }      
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
