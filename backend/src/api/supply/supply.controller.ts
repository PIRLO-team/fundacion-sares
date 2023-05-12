import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException } from '@nestjs/common';
import { SupplyCategoryService } from './supply-category.service';
import { CreateSupplyCategoryDto, CreateSupplyDto } from './dto/create-supply.dto';
import { CreateCategoryBySupplyDto } from './dto/create-supply.dto';
import { UpdateCategoryBySupplyCategoryDto, UpdateSupplyCategoryDto, UpdateSupplyDto } from './dto/update-supply.dto';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { UserToken } from '../../shared/decorators/user-token.decorator';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { SupplyService } from './supply.service';

@Controller()
export class SupplyController {
  constructor(
    private readonly supplyCategoryService: SupplyCategoryService,
    private readonly supplyService: SupplyService
  ) { }

  // * SUPPLY CATEGORY
  @Get('types')
  @UseGuards(JwtMiddleware)
  async getSupplyTypes() {
    const { response, title, message, status } =
      await this.supplyCategoryService.getSupplyTypes();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('categories')
  @UseGuards(JwtMiddleware)
  async getSupplyCategories() {
    const { response, title, message, status } =
      await this.supplyCategoryService.getSupplyCategories();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('all-categories')
  @UseGuards(JwtMiddleware)
  async getCategory() {
    const { response, title, message, status } =
      await this.supplyCategoryService.getCategory();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('category/:id')
  @UseGuards(JwtMiddleware)
  async getCategoryById(
    @Param('id') id: number
  ) {
    const { response, title, message, status } =
      await this.supplyCategoryService.getCategoryById(id);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-supply-category')
  @UseGuards(JwtMiddleware)
  async createSupplyCategory(
    @UserToken() user: TokenDto,
    @Body() createSupplyCategoryDto: CreateSupplyCategoryDto
  ) {
    const { response, title, message, status } =
      await this.supplyCategoryService.createSupplyCategory(user, createSupplyCategoryDto);

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
      await this.supplyCategoryService.updateSupplyCategory(id, user, updateSupplyCategoryDto, updateCategoryBySupplyCategoryDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-category-by-supply')
  @UseGuards(JwtMiddleware)
  async createCategoryBySupply(
    @UserToken() user: TokenDto,
    @Body() createCategoryBySupplyDto: CreateCategoryBySupplyDto
  ) {
    const { response, title, message, status } =
      await this.supplyCategoryService.createCategoryBySupply(user, createCategoryBySupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }

  // TODO: SUPPLY
  @Get('acquisition-types')
  @UseGuards(JwtMiddleware)
  async getAcquisitionTypes() {
    const { response, title, message, status } =
      await this.supplyService.getAcquisitionTypes();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('all')
  @UseGuards(JwtMiddleware)
  async getSupply() {
    const { response, title, message, status } =
      await this.supplyService.getSupply();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get(':id')
  @UseGuards(JwtMiddleware)
  async getSupplyById(
    @Param('id') id: string
  ) {
    const { response, title, message, status } =
      await this.supplyService.getSupplyById(id);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-supply')
  @UseGuards(JwtMiddleware)
  async createSupply(
    @UserToken() user: TokenDto,
    @Body() createSupplyDto: CreateSupplyDto
  ) {
    const { response, title, message, status } =
      await this.supplyService.createSupply(user, createSupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Patch('update-supply/:id')
  @UseGuards(JwtMiddleware)
  async updateSupply(
    @UserToken() user: TokenDto,
    @Param('id') id: string,
    @Body() updateSupplyDto: UpdateSupplyDto,
  ) {
    const { response, title, message, status } =
      await this.supplyService.updateSupply(id, user, updateSupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Patch('update-quantity-supply/:id')
  @UseGuards(JwtMiddleware)
  async updatedQuantity(
    @UserToken() user: TokenDto,
    @Param('id') id: string,
    @Body() updateSupplyDto: UpdateSupplyDto,
  ) {
    const { response, title, message, status } =
      await this.supplyService.updatedQuantity(id, user, updateSupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }
}
