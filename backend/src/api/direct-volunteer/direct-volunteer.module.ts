import { Module } from '@nestjs/common';
import { DirectVolunteerService } from './direct-volunteer.service';
import { DirectVolunteerController } from './direct-volunteer.controller';

@Module({
  controllers: [DirectVolunteerController],
  providers: [DirectVolunteerService]
})
export class DirectVolunteerModule {}
