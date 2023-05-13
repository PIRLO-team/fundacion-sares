import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1683857462776 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO
            discount_type (discount_type_name)
        VALUES
            ('Por donación'),
            ('Por formación'),
            ('Perdida'),
            ('Mal estado');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
