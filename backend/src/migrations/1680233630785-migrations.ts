import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1680233630785 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO role (role_name, role_description)
        VALUES
            (
                'Administrador',
                'El administrador es la persona encargada de administrar y supervisar toda la plataforma.'
            ),
            (
                'Personal de Bodega',
                'El personal de bodega es responsable de mantener y gestionar el inventario y los suministros de la empresa.'
            ),
            (
                'Médico',
                'El médico es responsable de proporcionar atención médica y cuidado a los pacientes.'
            ),
            (
                'Coordinador Logístico',
                'El coordinador logístico es responsable de la gestión y coordinación de las actividades logísticas de la empresa.'
            ),
            (
                'Coordinador de Formación',
                'El coordinador de formación es responsable de diseñar, coordinar y evaluar programas de formación y desarrollo del personal.'
            ),
            (
                'Coordinador Operativo',
                'El coordinador operativo es responsable de la planificación, organización y supervisión de las operaciones diarias de la empresa.'
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
