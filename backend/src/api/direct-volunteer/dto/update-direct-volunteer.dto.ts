import { PartialType } from '@nestjs/mapped-types';
import { CreateDirectVolunteerDto } from './create-direct-volunteer.dto';
import { Length } from 'class-validator';

export class UpdateDirectVolunteerDto extends PartialType(CreateDirectVolunteerDto) {
    public is_active: boolean;

    @Length(1, 10000, { message: 'La observación debe contener máximo 10000 caracteres' })
    public observation: string;
}
