import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1721025478420 implements MigrationInterface {
  name = 'SeedDB1721025478420';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    await queryRunner.query(
      //password 123
      `INSERT INTO users (username, email, password, bio) VALUES (
            'Johny', 'johny@op.pl', '$2b$10$hFZeriyKhDdh9XVoR4xB/ujcuwAx8t5VrcXhMqNIQdop6uglNKkOe', 'I am Johnny!'
        ), (
            'Gregory', 'gregory@op.pl', '$2b$10$hFZeriyKhDdh9XVoR4xB/ujcuwAx8t5VrcXhMqNIQdop6uglNKkOe', 'I am Gregory!'
        )`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article','My first article','This is my first article about nothing at all','Lorem ipsum here we go and so on...','coffee,dragons',1),('second-article','My second article','This is my second article about nothing at all','Lorem ipsum here we go and so on here too...','dragons',1), ('third-article','My third article','This is my third article about something interesting','I am the best user of this app and the best wrighter of all times!','',2)`,
    );
  }

  public async down(): Promise<void> {}
}
