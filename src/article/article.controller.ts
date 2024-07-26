import { ArticleService } from '@app/article/article.service';
import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateArticleDto } from '@app/article/dto/createArticle.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { ArticleResponseInterface } from '@app/article/types/articleResponse.interface';
import { UpdateArticleDto } from '@app/article/dto/updateArticle.dto';
import { ArticlesResponseInterface } from '@app/article/types/articlesResponseInterface';
import { BackendValidationPipe } from '@app/shered/pipes/beckendValidation.pipe';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') currentUseId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUseId, query);
  }

  @Get('/feed')
  @UseGuards(AuthGuard)
  async getFeed(
    @User('id') currentUserId: number,
    @Query() query: any,
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.getFeed(currentUserId, query);
  }

  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArtilceDto: CreateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArtilceDto,
    );
    return this.articleService.buildArticleRespone(article);
  }

  @Get('/:slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleRespone(article);
  }

  @Delete('/:slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }

  @Put('/:slug')
  @UseGuards(AuthGuard)
  async updateArcicle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: UpdateArticleDto,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.updateArticle(
      slug,
      currentUserId,
      updateArticleDto,
    );
    return this.articleService.buildArticleRespone(article);
  }

  @Post('/:slug/favorite')
  @UseGuards(AuthGuard)
  async addAricleToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorite(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleRespone(article);
  }

  @Delete('/:slug/favorite')
  @UseGuards(AuthGuard)
  async deleteAricleToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleToFavorite(
      slug,
      currentUserId,
    );
    return this.articleService.buildArticleRespone(article);
  }
}
