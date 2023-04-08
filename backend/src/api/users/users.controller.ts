import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAllUsers() {
    const { response, title, message, status } =
      await this.usersService.findAllUsers();
    throw new HttpException({ response, title, message, }, status);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.usersService.findUserById(+id);
    throw new HttpException({ response, title, message, }, status);
  }

  @Patch(':id')
  async updateUserData(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { response, title, message, status } =
      await this.usersService.updateUserData(+id, updateUserDto);
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
