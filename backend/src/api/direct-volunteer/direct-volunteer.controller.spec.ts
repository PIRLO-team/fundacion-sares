import { Test, TestingModule } from '@nestjs/testing';
import { DirectVolunteerController } from './direct-volunteer.controller';
import { DirectVolunteerService } from './direct-volunteer.service';

describe('DirectVolunteerController', () => {
  let controller: DirectVolunteerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectVolunteerController],
      providers: [DirectVolunteerService],
    }).compile();

    controller = module.get<DirectVolunteerController>(DirectVolunteerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
