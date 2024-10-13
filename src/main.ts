import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api')
  app.enableCors({
    origin: true,
    credentials : true,
    // methods: ['GET', 'POST', 'PUT', 'DELETE'],
    // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'], 
  });
  await app.listen(3000);
}
bootstrap();
