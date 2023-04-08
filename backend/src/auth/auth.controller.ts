import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query, Req, UseGuards } from '@nestjs/common';
import { UserToken } from '../shared/decorators/user-token.decorator';
import { TokenDto } from '../shared/interfaces/token.dto';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { Request } from 'express';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @UseGuards(JwtMiddleware)
  async register(
    @UserToken() User: TokenDto,
    @Body() CreateAuthDto: CreateUserDto
  ) {
    const { response, title, message, status } =
      await this.authService.registerUser(
        CreateAuthDto,
        User
      );

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('login')
  async logIn(
    @Body() LogInCredentialDto: LogInCredentialDto
  ) {
    const { response, title, message, status } =
      await this.authService.logIn(
        LogInCredentialDto
      );

    throw new HttpException({ response, title, message, }, status);
  }

  @Patch('reset')
  async findAll(
    @Query('user') user: number,
    @Query('code') code: string,
    @Body() UpdateAuthDto: UpdateAuthDto
  ) {
    const { response, title, message, status } =
      await this.authService.resetPassword(user, code, UpdateAuthDto);

    throw new HttpException({ response, title, message, }, status);
  }
}
