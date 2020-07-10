import { MigrationInterface, QueryRunner } from "typeorm";
import { DB_NAME } from '../../servConsts'

export class InitialCreateDB1593832999021 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createDatabase(DB_NAME, true).then(() => {
            console.log("migration ran");
        }).catch(e => {
            console.log(e);
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropDatabase(DB_NAME, true).then(() => {
            console.log("migration ran");
        }).catch(e => {
            console.log(e);
        });
    }

}
