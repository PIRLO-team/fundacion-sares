import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1683951279187 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO
            non_consumable_status (non_consumable_status_name)
        VALUES
            ('Se esterilizan'),
            ('No se esterilizan');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
