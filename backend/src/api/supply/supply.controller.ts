import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException } from '@nestjs/common';
import { SupplyService } from './supply.service';
import { CreateSupplyCategoryDto } from './dto/create-supply.dto';
import { CreateCategoryBySupplyDto } from './dto/create-supply.dto';
import { UpdateCategoryBySupplyCategoryDto, UpdateSupplyCategoryDto } from './dto/update-supply.dto';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { UserToken } from '../../shared/decorators/user-token.decorator';
import { TokenDto } from '../../shared/interfaces/token.dto';

@Controller()
export class SupplyController {
  constructor(private readonly supplyService: SupplyService) { }

  @Get('types')
  @UseGuards(JwtMiddleware)
  async getSupplyTypes() {
    const { response, title, message, status } =
      await this.supplyService.getSupplyTypes();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('categories')
  @UseGuards(JwtMiddleware)
  async getSupplyCategories() {
    const { response, title, message, status } =
      await this.supplyService.getSupplyCategories();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('all-categories')
  @UseGuards(JwtMiddleware)
  async getCategory() {
    const { response, title, message, status } =
      await this.supplyService.getCategory();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('category/:id')
  @UseGuards(JwtMiddleware)
  async getCategoryById(
    @Param('id') id: number
  ) {
    const { response, title, message, status } =
      await this.supplyService.getCategoryById(id);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-supply-category')
  @UseGuards(JwtMiddleware)
  async createSupplyCategory(
    @UserToken() user: TokenDto,
    @Body() createSupplyDto: CreateSupplyCategoryDto
  ) {
    const { response, title, message, status } =
      await this.supplyService.createSupplyCategory(user, createSupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Patch('update-supply-category/:id')
  @UseGuards(JwtMiddleware)
  async updateSupplyCategory(
    @UserToken() user: TokenDto,
    @Param('id') id: number,
    @Body() updateSupplyCategoryDto: UpdateSupplyCategoryDto,
    @Body() updateCategoryBySupplyCategoryDto: UpdateCategoryBySupplyCategoryDto
  ) {
    const { response, title, message, status } =
      await this.supplyService.updateSupplyCategory(id, user, updateSupplyCategoryDto, updateCategoryBySupplyCategoryDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-category-by-supply')
  @UseGuards(JwtMiddleware)
  async createCategoryBySupply(
    @UserToken() user: TokenDto,
    @Body() createCategoryBySupplyDto: CreateCategoryBySupplyDto
  ) {
    const { response, title, message, status } =
      await this.supplyService.createCategoryBySupply(user, createCategoryBySupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }
}
