import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../../auth/dto/create-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) { 
    img_profile: string;
    professional_card: string;
    phone: number;
    document: number;
    password: string;
}
