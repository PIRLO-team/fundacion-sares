import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683953360850 implements MigrationInterface {
    name = 'migrations1683953360850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ca8fd648fca6514181b2be7e266\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ee98490bacc33827a9481e9c248\``);
        await queryRunner.query(`CREATE TABLE \`non_consumable_category\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`non_consumable_category_supply_id\` bigint NOT NULL AUTO_INCREMENT, \`non_consumable_category_supply_name\` varchar(255) NOT NULL, \`non_consumable_status_id\` bigint NOT NULL, PRIMARY KEY (\`non_consumable_category_supply_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`non_consumable_name\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`adquisition_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`non_consumable_status_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`non_consumable_category_supply_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`acquisition_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable_category\` ADD CONSTRAINT \`FK_8bddfc9806f0a4d94b44471575c\` FOREIGN KEY (\`non_consumable_status_id\`) REFERENCES \`non_consumable_status\`(\`non_consumable_status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_7d1158be3efaa9ec2a5cc4ea549\` FOREIGN KEY (\`non_consumable_category_supply_id\`) REFERENCES \`non_consumable_category\`(\`non_consumable_category_supply_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_8f0767c8bb9b17f0e314fb9c9a6\` FOREIGN KEY (\`acquisition_id\`) REFERENCES \`acquisition_type\`(\`acquisition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_8f0767c8bb9b17f0e314fb9c9a6\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_7d1158be3efaa9ec2a5cc4ea549\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable_category\` DROP FOREIGN KEY \`FK_8bddfc9806f0a4d94b44471575c\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`acquisition_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP COLUMN \`non_consumable_category_supply_id\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`non_consumable_status_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`adquisition_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD \`non_consumable_name\` varchar(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE \`non_consumable_category\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ee98490bacc33827a9481e9c248\` FOREIGN KEY (\`adquisition_id\`) REFERENCES \`acquisition_type\`(\`acquisition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ca8fd648fca6514181b2be7e266\` FOREIGN KEY (\`non_consumable_status_id\`) REFERENCES \`non_consumable_status\`(\`non_consumable_status_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
