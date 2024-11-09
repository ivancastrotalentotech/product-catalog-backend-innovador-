import { Injectable, Logger } from '@nestjs/common';
import { findAll, updateProducts, insertProducts, deleteProducts }  from '../common/query/catalogos-productos';
import { NeoPool  } from '../pg.pool';
import { Product } from '../common/Interface/interface.product';

@Injectable()
export class ProductoService {

  private readonly logger = new Logger('ProductoService');

  constructor(
    private readonly neoPool: NeoPool,
  ){}


  async create(createProductoDto: Product) {
    const { id, nombre, descripcion, precio, categoria, imagen } = createProductoDto;
    try {
     
      this.logger.debug(`Creando Producto id: ${JSON.stringify(createProductoDto)}`);
      await this.neoPool.query(insertProducts, [nombre, descripcion, precio, categoria, imagen]);

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
        data: id
      };      
    }    
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

  async update(id: number, updateProductoDto: Product) {
    try {

      const { id, nombre, descripcion, precio, categoria, imagen } = updateProductoDto;
      
      this.logger.debug(`Editando Producto id: ${JSON.stringify(updateProductoDto)}`);
      await this.neoPool.query(updateProducts, [id, nombre, descripcion, precio, categoria, imagen]);

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
        data: id
      };      
    }      
  }

  async remove(id: number) {
    try {
      
      this.logger.debug(`Eliminando Producto id: ${JSON.stringify(id)}`);
      await this.neoPool.query(deleteProducts, [id]);

      return {
        status: 'success',
        message: 'Producto eliminado exitosamente',
        data: id,
      };
    } catch (error) {
      this.logger.error('Error eliminado producto', error.stack);
      return {
        status: 'error',
        message: 'Error eliminado producto',
        error: error.message,
        data: id
      };      
    }  
  }
}
