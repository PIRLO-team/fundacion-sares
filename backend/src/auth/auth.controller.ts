import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(
    @Body() CreateAuthDto: CreateAuthDto
  ) {
    const { response, title, message, status } =
      await this.authService.register(
        CreateAuthDto
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
