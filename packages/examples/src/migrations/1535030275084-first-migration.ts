import {MigrationInterface, QueryRunner} from "typeorm";

export class firstMigration1535030275084 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "codeName" varchar(100) NOT NULL, CONSTRAINT "UQ_390215abbc2901e2e623a69a03c" UNIQUE ("codeName"))`);
        await queryRunner.query(`CREATE TABLE "group" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(80) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`);
        await queryRunner.query(`CREATE TABLE "group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, PRIMARY KEY ("groupId", "permissionId"))`);
        await queryRunner.query(`CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`CREATE TABLE "user_user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`CREATE TABLE "temporary_group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "FK_24022d7e409de3835f25603d35d" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE, CONSTRAINT "FK_0777702b851f7662e2678b45689" FOREIGN KEY ("permissionId") REFERENCES "permission" ("id") ON DELETE CASCADE, PRIMARY KEY ("groupId", "permissionId"))`);
        await queryRunner.query(`INSERT INTO "temporary_group_permissions_permission"("groupId", "permissionId") SELECT "groupId", "permissionId" FROM "group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
        await queryRunner.query(`ALTER TABLE "temporary_group_permissions_permission" RENAME TO "group_permissions_permission"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, CONSTRAINT "FK_84ff6a520aee2bf2512c01cf462" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE, CONSTRAINT "FK_8abdfe8f9d78a4f5e821dbf6203" FOREIGN KEY ("groupId") REFERENCES "group" ("id") ON DELETE CASCADE, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_groups_group"("userId", "groupId") SELECT "userId", "groupId" FROM "user_groups_group"`);
        await queryRunner.query(`DROP TABLE "user_groups_group"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_groups_group" RENAME TO "user_groups_group"`);
        await queryRunner.query(`CREATE TABLE "temporary_user_user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, CONSTRAINT "FK_4c3462965c06c5bc3c8996f4524" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE, CONSTRAINT "FK_4a38ad03e94f4de594fc09fb53c" FOREIGN KEY ("permissionId") REFERENCES "permission" ("id") ON DELETE CASCADE, PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`INSERT INTO "temporary_user_user_permissions_permission"("userId", "permissionId") SELECT "userId", "permissionId" FROM "user_user_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "user_user_permissions_permission"`);
        await queryRunner.query(`ALTER TABLE "temporary_user_user_permissions_permission" RENAME TO "user_user_permissions_permission"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_user_permissions_permission" RENAME TO "temporary_user_user_permissions_permission"`);
        await queryRunner.query(`CREATE TABLE "user_user_permissions_permission" ("userId" integer NOT NULL, "permissionId" integer NOT NULL, PRIMARY KEY ("userId", "permissionId"))`);
        await queryRunner.query(`INSERT INTO "user_user_permissions_permission"("userId", "permissionId") SELECT "userId", "permissionId" FROM "temporary_user_user_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "temporary_user_user_permissions_permission"`);
        await queryRunner.query(`ALTER TABLE "user_groups_group" RENAME TO "temporary_user_groups_group"`);
        await queryRunner.query(`CREATE TABLE "user_groups_group" ("userId" integer NOT NULL, "groupId" integer NOT NULL, PRIMARY KEY ("userId", "groupId"))`);
        await queryRunner.query(`INSERT INTO "user_groups_group"("userId", "groupId") SELECT "userId", "groupId" FROM "temporary_user_groups_group"`);
        await queryRunner.query(`DROP TABLE "temporary_user_groups_group"`);
        await queryRunner.query(`ALTER TABLE "group_permissions_permission" RENAME TO "temporary_group_permissions_permission"`);
        await queryRunner.query(`CREATE TABLE "group_permissions_permission" ("groupId" integer NOT NULL, "permissionId" integer NOT NULL, PRIMARY KEY ("groupId", "permissionId"))`);
        await queryRunner.query(`INSERT INTO "group_permissions_permission"("groupId", "permissionId") SELECT "groupId", "permissionId" FROM "temporary_group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "temporary_group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "user_user_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "user_groups_group"`);
        await queryRunner.query(`DROP TABLE "group_permissions_permission"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "group"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
