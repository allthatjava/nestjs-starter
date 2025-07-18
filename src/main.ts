import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './transform.interceptor';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: /https:\/\/.*\.mydomain\.com$/,
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe()); // Added for Global validation
  app.useGlobalInterceptors(new TransformInterceptor());
  const port = 3000;
  await app.listen(process.env.PORT ?? port);
  logger.log(`Application listening on port ${port}`)
}
bootstrap();
