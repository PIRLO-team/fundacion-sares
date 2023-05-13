import { Test, TestingModule } from '@nestjs/testing';
import { SupplyCategoryService } from './supply-category.service';

describe('SupplyCategoryService', () => {
  let service: SupplyCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplyCategoryService],
    }).compile();

    service = module.get<SupplyCategoryService>(SupplyCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
