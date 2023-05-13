import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683950796017 implements MigrationInterface {
    name = 'migrations1683950796017'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`non_consumable_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`non_consumable_id\` varchar(50) NOT NULL PRIMARY KEY`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`non_consumable_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`non_consumable_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD PRIMARY KEY (\`non_consumable_id\`)`);
    }

}
