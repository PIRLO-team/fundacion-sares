import { MigrationInterface, QueryRunner } from "typeorm"

export class migrations1683776370117 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO supply_type (supply_type_name) VALUES ('Consumible'), ('Medicamento');
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
