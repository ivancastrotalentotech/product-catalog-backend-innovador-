import { Module, Logger } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductoModule } from './producto/producto.module';

import { EnvConfiguration } from './config/app.config';

@Module({
  imports: [
    ProductoModule,
    ConfigModule.forRoot({
      load: [EnvConfiguration]
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  private readonly logger = new Logger('AppModule')

    constructor(){
      this.logger.debug(`Inicializando Backend Catalogos de Productos`);
    }

}
