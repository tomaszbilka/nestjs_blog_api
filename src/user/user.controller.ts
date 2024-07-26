import { AuthGuard } from '@app/user/guards/auth.guard';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from '@app/user/dto/updateUser.dto';
import { User } from '@app/user/decorators/user.decorator';
import { UserEntity } from '@app/user/user.entity';
import { UserResponseInterface } from '@app/user/types/userResponse.interface';
import { UserService } from '@app/user/user.service';
import { BackendValidationPipe } from '@app/shered/pipes/beckendValidation.pipe';
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('users')
  @UsePipes(new BackendValidationPipe())
  async createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.createUser(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('users/login')
  @UsePipes(new BackendValidationPipe())
  async login(
    @Body('user') loginDto: LoginUserDto,
  ): Promise<UserResponseInterface> {
    const user = await this.userService.login(loginDto);
    return this.userService.buildUserResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  async currentUser(@User() user: UserEntity): Promise<UserResponseInterface> {
    return this.userService.buildUserResponse(user);
  }

  @Patch('user')
  @UseGuards(AuthGuard)
  @UsePipes(new BackendValidationPipe())
  async updateCurrentUser(
    @Body('user') updateUserDto: UpdateUserDto,
    @User('id') userId: UserEntity['id'],
  ): Promise<UserResponseInterface> {
    const user = await this.userService.updateUser(userId, updateUserDto);
    return this.userService.buildUserResponse(user);
  }
}
