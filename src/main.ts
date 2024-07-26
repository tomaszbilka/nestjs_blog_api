if (!process.env.IS_TS_NODE) {
  require('module-alias/register');
}

import { AppModule } from '@app/app.module';
import { NestFactory } from '@nestjs/core';
// import { setupApp } from '@app/setup-app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // BackendValidationPipe() is used to customize error shape so no global pipe is needed
  // setupApp(app);
  await app.listen(3000);
}
bootstrap();
