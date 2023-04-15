import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserToken } from '../../shared/decorators/user-token.decorator';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('all/admin')
  @UseGuards(JwtMiddleware)
  async findAllUsersAdmin(
    @UserToken() user: TokenDto,
  ) {
    const { response, title, message, status } =
      await this.usersService.findAllUsersAdmin(user);
    throw new HttpException({ response, title, message, }, status);
  }

  @Get('all')
  @UseGuards(JwtMiddleware)
  async findAllUsers() {
    const { response, title, message, status } =
      await this.usersService.findAllUsers();
    throw new HttpException({ response, title, message, }, status);
  }

  @Get(':user_id')
  @UseGuards(JwtMiddleware)
  async findUserById(
    @Param('user_id') user_id: string
  ) {
    const { response, title, message, status } =
      await this.usersService.findUserById(+user_id);
    throw new HttpException({ response, title, message, }, status);
  }

  @Patch(':user_id')
  @UseGuards(JwtMiddleware)
  async updateUserData(
    @UserToken() user: TokenDto,
    @Param('user_id') user_id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const { response, title, message, status } =
      await this.usersService.updateUserData(user, +user_id, updateUserDto);
    throw new HttpException({ response, title, message, }, status);
  }

  @Delete('inactive/:id')
  async inactiveUser(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.usersService.inactiveUser(+id);
    throw new HttpException({ response, title, message, }, status);
  }

  @Delete('remove/:id')
  async logicalRemove(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.usersService.logicalRemove(+id);
    throw new HttpException({ response, title, message, }, status);
  }
}
