import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683851945920 implements MigrationInterface {
    name = 'migrations1683851945920'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`discount_supply\` (\`discount_supply_id\` bigint NOT NULL AUTO_INCREMENT, \`quantity\` bigint NOT NULL, \`motive\` varchar(100) NOT NULL, \`supply_id\` varchar(255) NOT NULL, PRIMARY KEY (\`discount_supply_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`discount_supply\` ADD CONSTRAINT \`FK_6364e1f59fc4c22f2f85cfdfcdb\` FOREIGN KEY (\`supply_id\`) REFERENCES \`supply\`(\`supply_id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`discount_supply\` DROP FOREIGN KEY \`FK_6364e1f59fc4c22f2f85cfdfcdb\``);
        await queryRunner.query(`DROP TABLE \`discount_supply\``);
    }

}
