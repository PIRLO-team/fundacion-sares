import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { DirectVolunteerService } from './direct-volunteer.service';
import { CreateDirectVolunteerDto } from './dto/create-direct-volunteer.dto';
import { UpdateDirectVolunteerDto } from './dto/update-direct-volunteer.dto';
import { UserToken } from '../../shared/decorators/user-token.decorator';
import { TokenDto } from '../../shared/interfaces/token.dto';

@Controller()
export class DirectVolunteerController {
  constructor(private readonly directVolunteerService: DirectVolunteerService) { }

  @Get()
  async findAllUsers() {
    const { response, title, message, status } =
      await this.directVolunteerService.findAll();
    throw new HttpException({ response, title, message, }, status);
  }

  @Get(':id')
  async findUserById(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.directVolunteerService.findOne(+id);
    throw new HttpException({ response, title, message, }, status);
  }

  @Post('register')
  async createVolunteer(
    @UserToken() user: TokenDto,
    @Body() createVolunteer: CreateDirectVolunteerDto
  ) {
    const { response, title, message, status } =
      await this.directVolunteerService.create(user, createVolunteer);
    throw new HttpException({ response, title, message, }, status);
  }

  @Patch(':id')
  async updateUserData(
    @UserToken() user: TokenDto,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateDirectVolunteerDto
  ) {
    const { response, title, message, status } =
      await this.directVolunteerService.update(user, +id, updateUserDto);
    throw new HttpException({ response, title, message, }, status);
  }

  @Delete('remove/:id')
  async inactiveUser(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.directVolunteerService.deleteById(+id);
    throw new HttpException({ response, title, message, }, status);
  }
}
