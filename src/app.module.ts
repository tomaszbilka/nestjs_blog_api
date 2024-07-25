import { AppController } from '@app/app.controller';
import { AppService } from '@app/app.service';
import { ArticleModule } from '@app/article/article.module';
import { AuthMiddleware } from '@app/user/middlewares/auth.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ProfileModule } from '@app/profile/profile.module';
import { TagModule } from '@app/tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '@app/user/user.module';
import ormconfig from '@app/ormconfig';

@Module({
  imports: [
    ArticleModule,
    ProfileModule,
    TagModule,
    TypeOrmModule.forRoot(ormconfig),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
