import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683951076905 implements MigrationInterface {
    name = 'migrations1683951076905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_8e51e664fbc9b57aab315b918f2\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ee98490bacc33827a9481e9c248\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`provider_id\` \`provider_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`adquisition_id\` \`adquisition_id\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`agreement\` \`agreement\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`damage_date\` \`damage_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`non_sterilized_date\` \`non_sterilized_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_8e51e664fbc9b57aab315b918f2\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`provider_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ee98490bacc33827a9481e9c248\` FOREIGN KEY (\`adquisition_id\`) REFERENCES \`acquisition_type\`(\`acquisition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_ee98490bacc33827a9481e9c248\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` DROP FOREIGN KEY \`FK_8e51e664fbc9b57aab315b918f2\``);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`non_sterilized_date\` \`non_sterilized_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`damage_date\` \`damage_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`agreement\` \`agreement\` text NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`adquisition_id\` \`adquisition_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` CHANGE \`provider_id\` \`provider_id\` bigint NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_ee98490bacc33827a9481e9c248\` FOREIGN KEY (\`adquisition_id\`) REFERENCES \`acquisition_type\`(\`acquisition_type_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`non_consumable\` ADD CONSTRAINT \`FK_8e51e664fbc9b57aab315b918f2\` FOREIGN KEY (\`provider_id\`) REFERENCES \`provider\`(\`provider_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
