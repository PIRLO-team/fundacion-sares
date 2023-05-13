import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683951263093 implements MigrationInterface {
    name = 'migrations1683951263093'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ca8fd648fca6514181b2be7e266\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable_status\` DROP PRIMARY KEY`);
        await queryRunner.query(`ALTER TABLE \`non_consumable_status\` DROP COLUMN \`non_consumable_status_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable_status\` ADD \`non_consumable_status_id\` bigint NOT NULL PRIMARY KEY AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ca8fd648fca6514181b2be7e266\` FOREIGN KEY (\`non_consumable_status_id\`) REFERENCES \`non_consumable_status\`(\`non_consumable_status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ca8fd648fca6514181b2be7e266\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable_status\` DROP COLUMN \`non_consumable_status_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable_status\` ADD \`non_consumable_status_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable_status\` ADD PRIMARY KEY (\`non_consumable_status_id\`)`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ca8fd648fca6514181b2be7e266\` FOREIGN KEY (\`non_consumable_status_id\`) REFERENCES \`non_consumable_status\`(\`non_consumable_status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
