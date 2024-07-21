import { Module } from '@nestjs/common';
import { ArticleController } from '@app/article/article.controller';
import { ArticleService } from '@app/article/article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';

@Module({
  controllers: [ArticleController],
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  providers: [ArticleService],
})
export class ArticleModule {}
