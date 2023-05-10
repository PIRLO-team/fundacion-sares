import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { CreateSupplyDto } from './dto/create-supply.dto';
import { UpdateSupplyDto } from './dto/update-supply.dto';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';

@Controller()
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) {}

  @Post()
  @UseGuards(JwtMiddleware)
  create(@Body() createSupplyDto: CreateSupplyDto) {
    return this.supplyService.create(createSupplyDto);
  }

  @Get()
  @UseGuards(JwtMiddleware)
  findAll() {
    return this.supplyService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtMiddleware)
  findOne(@Param('id') id: string) {
    return this.supplyService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtMiddleware)
  update(@Param('id') id: string, @Body() updateSupplyDto: UpdateSupplyDto) {
    return this.supplyService.update(+id, updateSupplyDto);
  }

  @Delete(':id')
  @UseGuards(JwtMiddleware)
  remove(@Param('id') id: string) {
    return this.supplyService.remove(+id);
  }
}
