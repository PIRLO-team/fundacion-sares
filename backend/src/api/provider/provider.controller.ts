import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Controller()
export class ProviderController {
  constructor(private readonly providerService: ProviderService) { }

  @Get()
  async findAll() {
    const { response, title, message, status } =
      await this.providerService.findAll();
    throw new HttpException({ response, title, message }, status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.providerService.findById(+id);
    throw new HttpException({ response, title, message }, status);
  }

  @Post('register')
  async create(@Body() createProviderDto: CreateProviderDto) {
    const { response, title, message, status } =
      await this.providerService.create(createProviderDto);
    throw new HttpException({ response, title, message }, status);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProviderDto: UpdateProviderDto
  ) {
    const { response, title, message, status } =
      await this.providerService.update(+id, updateProviderDto);
    throw new HttpException({ response, title, message }, status);
  }

  @Delete('remove/:id')
  async remove(@Param('id') id: string) {
    const { response, title, message, status } =
      await this.providerService.delete(+id);
    throw new HttpException({ response, title, message }, status);
  }
}
