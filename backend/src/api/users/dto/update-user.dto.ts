import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '../../../auth/dto/create-auth.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    img_profile: string;
    phone: number;
    document: string;
    password: string;
    is_active: boolean;
    new_password: string;
    comfirm_password: string;
}
