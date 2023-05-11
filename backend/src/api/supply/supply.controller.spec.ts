import { Test, TestingModule } from '@nestjs/testing';
import { SupplyController } from './supply.controller';
import { SupplyCategoryService } from './supply-category.service';

describe('SupplyController', () => {
  let controller: SupplyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SupplyController],
      providers: [SupplyCategoryService],
    }).compile();

    controller = module.get<SupplyController>(SupplyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
