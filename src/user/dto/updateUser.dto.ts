import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  readonly username: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly password: string;

  @IsString()
  @IsOptional()
  readonly image: string;

  @IsString()
  @IsOptional()
  readonly bio: string;
}
