import { IsNotEmpty, IsEmail, Length, IsNumber, MinLength, MaxLength, Min, Max } from 'class-validator';

export class CreateProviderDto {
    @Length(1, 45, { message: 'El nombre del provedor debe tener máximo 50 caracteres' })
    name: string;

    @IsNotEmpty({ message: 'El email es requerido' })
    @IsEmail({}, { message: 'El email no es válido' })
    email: string;

    @IsNotEmpty({ message: 'El nit es requerido' })
    @IsNumber({}, { message: 'El nit debe ser un número' })
    @Min(10000000, { message: 'El nit debe tener como mínimo 8 caracteres' })
    @Max(999999999999999, { message: 'El nit debe tener como máximo 15 caracteres' })
    nit: number;

    other_contact?: string;

    @IsNumber({}, { message: 'El número de contacto debe ser un número' })
    @Min(100000000, { message: 'El número de contacto debe tener como mínimo 8 caracteres' })
    @Max(9999999999, { message: 'El número de contacto debe tener como máximo 10 caracteres' })
    phone?: number;
}