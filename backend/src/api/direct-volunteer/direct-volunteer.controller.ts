import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { DirectVolunteerService } from './direct-volunteer.service';
import { CreateDirectVolunteerDto } from './dto/create-direct-volunteer.dto';
import { UpdateDirectVolunteerDto } from './dto/update-direct-volunteer.dto';

@Controller()
export class DirectVolunteerController {
  constructor(private readonly directVolunteerService: DirectVolunteerService) {}

  @Get()
  async findAllUsers() {
    const { response, title, message, status } =
      await this.directVolunteerService.findAllUsers();
    throw new HttpException({ response, title, message, }, status);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.directVolunteerService.findUserById(+id);
    throw new HttpException({ response, title, message, }, status);
  }

  @Patch(':id')
  async updateUserData(@Param('id') id: string, @Body() updateUserDto: UpdateDirectVolunteerDto) {
    const { response, title, message, status } =
      await this.directVolunteerService.updateUserData(+id, updateUserDto);
    throw new HttpException({ response, title, message, }, status);
  }

  @Delete('inactive/:id')
  async inactiveUser(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.directVolunteerService.inactiveUser(+id);
    throw new HttpException({ response, title, message, }, status);
  }

  @Delete('remove/:id')
  async logicalRemove(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.directVolunteerService.logicalRemove(+id);
    throw new HttpException({ response, title, message, }, status);
  }
}
