import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LogInCredentialDto } from './dto/login-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/login')
  async logIn(
    @Body() LogInCredentialDto: LogInCredentialDto,
    @Res() res: Response
  ) {
    const { message, response, status } = await this.authService.logIn(
      LogInCredentialDto
    );

    throw new HttpException({ message, response }, status);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
