import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = 3001;
  await app.listen(PORT ?? 3000, () => {
    console.log(`Application is running on: http://localhost:${PORT}`);
  });
}
bootstrap();
