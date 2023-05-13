import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683601310760 implements MigrationInterface {
    name = 'migrations1683601310760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`supply_type\` (\`supply_type_id\` bigint NOT NULL AUTO_INCREMENT, \`supply_type_name\` varchar(255) NOT NULL, PRIMARY KEY (\`supply_type_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category_by_supply\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`supply_category_id\` bigint NOT NULL AUTO_INCREMENT, \`supply_category_name\` varchar(255) NOT NULL, \`quantity\` bigint NOT NULL, \`supply_id\` bigint NOT NULL, PRIMARY KEY (\`supply_category_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`supply_category\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`supply_id\` bigint NOT NULL AUTO_INCREMENT, \`supply_name\` varchar(255) NOT NULL, \`min_quantity\` bigint NOT NULL, \`supply_type_id\` bigint NOT NULL, PRIMARY KEY (\`supply_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`non_consumable\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`non_consumable_id\` bigint NOT NULL, \`non_consumable_name\` varchar(255) NOT NULL, \`provider_id\` bigint NOT NULL, \`adquisition_id\` bigint NOT NULL, \`agreement\` text NOT NULL, \`non_consumable_status_id\` bigint NOT NULL, \`damage_date\` date NOT NULL, \`non_sterilized_date\` date NOT NULL, PRIMARY KEY (\`non_consumable_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`supply\` (\`is_active\` tinyint NOT NULL DEFAULT 1, \`created_date\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`last_updated_date\` timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`created_by\` bigint NULL, \`last_updated_by\` bigint NULL, \`supply_id\` bigint NOT NULL, \`supply_category_id\` bigint NOT NULL, \`category_by_supply_id\` bigint NOT NULL, \`provider_id\` bigint NOT NULL, \`acquisition_id\` bigint NOT NULL, \`agreement\` text NOT NULL, \`expiration_date\` date NOT NULL, \`quantity\` bigint NOT NULL, PRIMARY KEY (\`supply_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`acquisition_type\` (\`acquisition_type_id\` bigint NOT NULL AUTO_INCREMENT, \`acquisition_name\` varchar(255) NOT NULL, PRIMARY KEY (\`acquisition_type_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`non_consumable_status\` (\`non_consumable_status_id\` bigint NOT NULL, \`non_consumable_status_name\` varchar(255) NOT NULL, PRIMARY KEY (\`non_consumable_status_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`category_by_supply\` ADD CONSTRAINT \`FK_93549856eac67791d6e43c8dddc\` FOREIGN KEY (\`supply_id\`) REFERENCES \`supply_category\`(\`supply_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supply_category\` ADD CONSTRAINT \`FK_55b51e15750fc9829f68ca203aa\` FOREIGN KEY (\`supply_type_id\`) REFERENCES \`supply_type\`(\`supply_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_8e51e664fbc9b57aab315b918f2\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`provider_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ee98490bacc33827a9481e9c248\` FOREIGN KEY (\`adquisition_id\`) REFERENCES \`acquisition_type\`(\`acquisition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD CONSTRAINT \`FK_2e530ca47d3c4005601fd511815\` FOREIGN KEY (\`supply_category_id\`) REFERENCES \`supply_category\`(\`supply_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD CONSTRAINT \`FK_5b906a760c7a46574ad5b7b50d2\` FOREIGN KEY (\`category_by_supply_id\`) REFERENCES \`category_by_supply\`(\`supply_category_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD CONSTRAINT \`FK_05dca7c23d15b4c74a7c93c6eff\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`provider_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`supply\` ADD CONSTRAINT \`FK_f73940a7e24d379dc1b25293b4b\` FOREIGN KEY (\`acquisition_id\`) REFERENCES \`acquisition_type\`(\`acquisition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply\` DROP FOREIGN KEY \`FK_f73940a7e24d379dc1b25293b4b\``);
        await queryRunner.query(`ALTER TABLE \`supply\` DROP FOREIGN KEY \`FK_05dca7c23d15b4c74a7c93c6eff\``);
        await queryRunner.query(`ALTER TABLE \`supply\` DROP FOREIGN KEY \`FK_5b906a760c7a46574ad5b7b50d2\``);
        await queryRunner.query(`ALTER TABLE \`supply\` DROP FOREIGN KEY \`FK_2e530ca47d3c4005601fd511815\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ee98490bacc33827a9481e9c248\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_8e51e664fbc9b57aab315b918f2\``);
        await queryRunner.query(`ALTER TABLE \`supply_category\` DROP FOREIGN KEY \`FK_55b51e15750fc9829f68ca203aa\``);
        await queryRunner.query(`ALTER TABLE \`category_by_supply\` DROP FOREIGN KEY \`FK_93549856eac67791d6e43c8dddc\``);
        await queryRunner.query(`DROP TABLE \`non_consumable_status\``);
        await queryRunner.query(`DROP TABLE \`acquisition_type\``);
        await queryRunner.query(`DROP TABLE \`supply\``);
        await queryRunner.query(`DROP TABLE \`non_consumable\``);
        await queryRunner.query(`DROP TABLE \`supply_category\``);
        await queryRunner.query(`DROP TABLE \`category_by_supply\``);
        await queryRunner.query(`DROP TABLE \`supply_type\``);
    }

}
