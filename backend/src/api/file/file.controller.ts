import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException } from '@nestjs/common';
import { FileService } from './file.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { UserToken } from '../../shared/decorators/user-token.decorator';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { TokenDto } from '../../shared/interfaces/token.dto';

@Controller()
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.fileService.create(createFileDto);
  }

  @Get()
  findAll() {
    return this.fileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fileService.findOne(+id);
  }

  @Patch('update/:user_id')
  @UseGuards(JwtMiddleware)
  async updateUserData(
    @UserToken() user: TokenDto,
    @Param('user_id') user_id: string,
    @Body() updateFileDto: UpdateFileDto
  ) {
    const { response, title, message, status } =
      await this.fileService.updateFile(user, +user_id, updateFileDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fileService.remove(+id);
  }
}
