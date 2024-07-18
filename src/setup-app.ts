import { INestApplication, ValidationPipe } from '@nestjs/common';

export const setupApp = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
};
