import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1683852774073 implements MigrationInterface {
    name = 'migrations1683852774073'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply\` CHANGE \`agreement\` \`agreement\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`supply\` CHANGE \`expiration_date\` \`expiration_date\` date NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`supply\` CHANGE \`expiration_date\` \`expiration_date\` date NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`supply\` CHANGE \`agreement\` \`agreement\` text NOT NULL`);
    }

}
