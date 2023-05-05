import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectVolunteerDto } from './create-direct-volunteer.dto';

export class UpdateDirectVolunteerDto extends PartialType(CreateDirectVolunteerDto) {
    public is_active: boolean;
    public observation: string;
}
