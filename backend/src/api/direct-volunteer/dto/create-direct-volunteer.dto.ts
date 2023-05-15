import { IsNotEmpty, IsEmail, IsNumber, Length } from "class-validator";

export class CreateDirectVolunteerDto {
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @Length(1, 50, { message: 'El nombre debe tener máximo 50 caracteres' })
    public first_name: string;
    
    @IsNotEmpty({ message: 'El apellido es requerido' })
    @Length(1, 50, { message: 'El apellido debe tener máximo 50 caracteres' })
    public last_name: string;

    @IsNotEmpty({ message: 'El email es requerido' })
    @IsEmail({}, { message: 'El email no es válido' })
    public email: string;

    @IsNotEmpty({ message: 'La profesión es requerida' })
    public profession: string;

    @IsNotEmpty({ message: 'El documento es requerido' })
    public document: string;

    @IsNotEmpty({ message: 'El teléfono es requerido' })
    @IsNumber({}, { message: 'El teléfono debe ser un número' })
    public phone: number;

    public other_contact?: string;
}
