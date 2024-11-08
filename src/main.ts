import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';

async function bootstrap() {

  try {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api/');
    app.use(express.json({ limit: '100mb' }));
    app.use(express.urlencoded({ extended: true, limit: '100mb' }));
    app.enableCors();
    console.log(`Puerto: ${process.env.PORT }`);
    await app.listen(process.env.PORT ?? 3000);    
  } catch (error) {
    console.log('EL ERROR MAS GRANDE');
    console.log(error);
  }

}
bootstrap();
