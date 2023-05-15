import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpException } from '@nestjs/common';
import { SupplyCategoryService } from './supply-category.service';
import { CreateNonConsumableCategorySupplyDto, CreateNonConsumableSupplyDto, CreateSupplyCategoryDto, CreateSupplyDto } from './dto/create-supply.dto';
import { CreateCategoryBySupplyDto } from './dto/create-supply.dto';
import { UpdateCategoryBySupplyCategoryDto, UpdateNonConsumableSupplyDto, UpdateSupplyCategoryDto, UpdateSupplyDto } from './dto/update-supply.dto';
import { JwtMiddleware } from '../../auth/middleware/jwt.middleware';
import { UserToken } from '../../shared/decorators/user-token.decorator';
import { TokenDto } from '../../shared/interfaces/token.dto';
import { SupplyService } from './supply.service';
import { NonConsumableService } from './non-consumable.service';

@Controller()
export class SupplyController {
  constructor(
    private readonly supplyCategoryService: SupplyCategoryService,
    private readonly supplyService: SupplyService,
    private readonly nonConsumableService: NonConsumableService
  ) { }

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

  @Delete('delete/supply-category/:id')
  @UseGuards(JwtMiddleware)
  async deleteSupplyCategory(
    @Param('id') id: number,
    @UserToken() user: TokenDto,
  ) {
    const { response, title, message, status } =
      await this.supplyCategoryService.deleteSupplyCategory(id, user);

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('acquisition-types')
  @UseGuards(JwtMiddleware)
  async getAcquisitionTypes() {
    const { response, title, message, status } =
      await this.supplyService.getAcquisitionTypes();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('discount-types')
  @UseGuards(JwtMiddleware)
  async getDiscountTypes() {
    const { response, title, message, status } =
      await this.supplyService.getDiscountTypes();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('all')
  @UseGuards(JwtMiddleware)
  async getSupply() {
    const { response, title, message, status } =
      await this.supplyService.getSupply();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('expired')
  @UseGuards(JwtMiddleware)
  async getExpired() {
    const { response, title, message, status } =
      await this.supplyService.getExpired();

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

  @Delete('delete/supply/:id')
  @UseGuards(JwtMiddleware)
  async deleteSupply(
    @Param('id') id: string,
    @UserToken() user: TokenDto,
  ) {
    const { response, title, message, status } =
      await this.supplyService.deleteSupply(id, user);

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('non-consumable/categories')
  @UseGuards(JwtMiddleware)
  async getNonCosumableCategories() {
    const { response, title, message, status } =
      await this.nonConsumableService.getNonCosumableCategories();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('non-consumable/types')
  @UseGuards(JwtMiddleware)
  async getNonConsumableStatus() {
    const { response, title, message, status } =
      await this.nonConsumableService.getNonConsumableStatus();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('non-consumable/all')
  @UseGuards(JwtMiddleware)
  async getNonConsumableSupplies() {
    const { response, title, message, status } =
      await this.nonConsumableService.getNonConsumableSupplies();

    throw new HttpException({ response, title, message, }, status);
  }

  @Get('non-consumable/:nonSupplyId')
  @UseGuards(JwtMiddleware)
  async getNonConsumableSupplyById(
    @Param('nonSupplyId') nonSupplyId: string
  ) {
    const { response, title, message, status } =
      await this.nonConsumableService.getNonConsumableSupplyById(nonSupplyId);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-non-consumable-supply-category')
  @UseGuards(JwtMiddleware)
  async createNonConsumableHeaderSupply(
    @UserToken() user: TokenDto,
    @Body() createNonConsumableCategorySupplyDto: CreateNonConsumableCategorySupplyDto
  ) {
    const { response, title, message, status } =
      await this.nonConsumableService.createNonConsumableHeaderSupply(user, createNonConsumableCategorySupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Post('create-non-consumable-supply')
  @UseGuards(JwtMiddleware)
  async createNonConsumableSupply(
    @UserToken() user: TokenDto,
    @Body() createNonConsumableSupplyDto: CreateNonConsumableSupplyDto
  ) {
    const { response, title, message, status } =
      await this.nonConsumableService.createNonConsumableSupply(user, createNonConsumableSupplyDto);

    throw new HttpException({ response, title, message, }, status);
  }

  @Patch('update-non-consumable-supply/:nonConsumableId')
  @UseGuards(JwtMiddleware)
  async updateNonConsumableSupply(
    @UserToken() user: TokenDto,
    @Body() updateNonConsumableSupplyDto: UpdateNonConsumableSupplyDto,
    @Param('nonConsumableId') nonConsumableId: string
  ) {
    const { response, title, message, status } =
      await this.nonConsumableService.updateNonConsumableSupply(user, updateNonConsumableSupplyDto, nonConsumableId);

    throw new HttpException({ response, title, message, }, status);
  }

  @Patch('discount-non-consumable-supply/:nonConsumableId')
  @UseGuards(JwtMiddleware)
  async discountNonConsumableSupply(
    @UserToken() user: TokenDto,
    @Body() updateNonConsumableSupplyDto: UpdateNonConsumableSupplyDto,
    @Param('nonConsumableId') nonConsumableId: string
  ) {
    const { response, title, message, status } =
      await this.nonConsumableService.discountNonConsumableSupply(user, updateNonConsumableSupplyDto, nonConsumableId);

    throw new HttpException({ response, title, message, }, status);
  }

  @Delete('delete-non-consumable-supply/:nonConsumableId')
  @UseGuards(JwtMiddleware)
  async deleteNonConsumableSupply(
    @UserToken() user: TokenDto,
    @Param('nonConsumableId') nonConsumableId: string
  ) {
    const { response, title, message, status } =
      await this.nonConsumableService.deleteNonConsumableSupply(user, nonConsumableId);

    throw new HttpException({ response, title, message, }, status);
  }
}
