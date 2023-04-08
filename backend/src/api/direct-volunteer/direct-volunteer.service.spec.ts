import { Test, TestingModule } from '@nestjs/testing';
import { DirectVolunteerService } from './direct-volunteer.service';

describe('DirectVolunteerService', () => {
  let service: DirectVolunteerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectVolunteerService],
    }).compile();

    service = module.get<DirectVolunteerService>(DirectVolunteerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
