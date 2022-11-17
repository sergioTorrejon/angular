import { MigrationInterface, QueryRunner } from "typeorm";

export class init1668634352241 implements MigrationInterface {
    name = 'init1668634352241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "persona_natural" ("id" SERIAL NOT NULL, "nro_identificacion" character varying(50), "primer_nombre_persona" character varying(250), "segundo_nombre_persona" character varying(250), "primer_apellido_persona" character varying(50), "segundo_apellido_persona" character varying(50), "tipo_identificacion" character varying(250), "email" character varying(250), "telefono" character varying(250), "direccion" character varying(250), "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_e1782b2b53eb1d0ada12bb15529" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_empresa" ("id" integer NOT NULL, "nivel" integer NOT NULL DEFAULT '1', "categoria" character varying(50) NOT NULL, "codigo" character varying(50), "descripcion" character varying(250), "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_c30858b2e250bb009b3d487ab66" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "empresas" ("id" SERIAL NOT NULL, "codigo" character varying(50) NOT NULL, "sigla" character varying(50), "nombre" character varying(250), "nombre_corto" character varying(250), "nro_seprem" character varying(50), "nit" character varying(50), "email" character varying(250), "telefono" character varying(250), "direccion" character varying(250), "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), "id_tipo_empresa" integer, CONSTRAINT "PK_ce7b122b37c6499bfd6520873e1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_funcionario" ("id" SERIAL NOT NULL, "nivel" integer NOT NULL DEFAULT '1', "categoria" character varying(50) NOT NULL, "codigo" character varying(50), "descripcion" character varying(250), "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_cb98e7f4fc3dc33d158b6d16af1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registros_bajas" ("id" SERIAL NOT NULL, "nroBaja" character varying(4) NOT NULL, "fecha_baja" TIMESTAMP, "comentarios" text, "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), "id_registro_funcionario" integer, "id_categoria_funcionario" integer, CONSTRAINT "PK_e19c5b356e6461881ced7378f62" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registros_funcionarios" ("id" SERIAL NOT NULL, "tipo_cargo" character varying(50), "cargo" character varying(50) NOT NULL, "ciudad" character varying(50), "nro_contrato" character varying(50), "fecha_ingreso" TIMESTAMP NOT NULL, "estado" character varying(50) NOT NULL, "nro_representacion_legal" character varying(50), "fecha_inicio_representacion_legal" TIMESTAMP, "fecha_fin_representacion_legal" TIMESTAMP, "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), "id_persona" integer, "id_empresa" integer, CONSTRAINT "PK_73d3fd87b1e4d08a4ae295086e0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "catalogos" ("id" SERIAL NOT NULL, "cod_tab" character varying(3) NOT NULL, "cod_ele" character varying(5) NOT NULL, "descrip" character varying(100) NOT NULL, CONSTRAINT "PK_1d78e1f35ded834637978e7cbf2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "registros_hechos_posteriores" ("id" SERIAL NOT NULL, "fecha_registro" TIMESTAMP, "descripcion" text, "estado" character varying(50) NOT NULL, "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), "id_registros_baja" integer, "id_categoria_funcionario" integer, CONSTRAINT "PK_23ebcba04aaffcf285ad61b1537" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_registro" ("id" SERIAL NOT NULL, "nivel" integer NOT NULL DEFAULT '1', "categoria" character varying(50) NOT NULL, "codigo" character varying(50), "descripcion" character varying(250), "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_9ce21c2f082ec2dc1c7fa21827e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categoria_persona" ("id" SERIAL NOT NULL, "nivel" integer NOT NULL DEFAULT '1', "categoria" character varying(50) NOT NULL, "codigo" character varying(50), "descripcion" character varying(250), "status" boolean NOT NULL DEFAULT true, "usuario_creacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_creacion" TIMESTAMP NOT NULL DEFAULT now(), "usuario_modificacion" character varying(50) NOT NULL DEFAULT 'default', "fecha_modificacion" TIMESTAMP DEFAULT now(), CONSTRAINT "PK_a2e5287b7deb752e4b7baf2aeef" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "empresas" ADD CONSTRAINT "FK_2d25a87343439a177ffb3d279f5" FOREIGN KEY ("id_tipo_empresa") REFERENCES "categoria_empresa"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_bajas" ADD CONSTRAINT "FK_7dd12ee6d33764502fb7974ba31" FOREIGN KEY ("id_registro_funcionario") REFERENCES "registros_funcionarios"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_bajas" ADD CONSTRAINT "FK_e068514d0dcd853c5b8e06c33d4" FOREIGN KEY ("id_categoria_funcionario") REFERENCES "categoria_funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_funcionarios" ADD CONSTRAINT "FK_48edc7105a5458696f177e992c9" FOREIGN KEY ("id_persona") REFERENCES "persona_natural"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_funcionarios" ADD CONSTRAINT "FK_0964456da02c1fa01e6ec3d63f8" FOREIGN KEY ("id_empresa") REFERENCES "empresas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_hechos_posteriores" ADD CONSTRAINT "FK_4d8eb450008ecec59005f89e906" FOREIGN KEY ("id_registros_baja") REFERENCES "registros_bajas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "registros_hechos_posteriores" ADD CONSTRAINT "FK_b22abc0e0a06c180561493d170a" FOREIGN KEY ("id_categoria_funcionario") REFERENCES "categoria_funcionario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registros_hechos_posteriores" DROP CONSTRAINT "FK_b22abc0e0a06c180561493d170a"`);
        await queryRunner.query(`ALTER TABLE "registros_hechos_posteriores" DROP CONSTRAINT "FK_4d8eb450008ecec59005f89e906"`);
        await queryRunner.query(`ALTER TABLE "registros_funcionarios" DROP CONSTRAINT "FK_0964456da02c1fa01e6ec3d63f8"`);
        await queryRunner.query(`ALTER TABLE "registros_funcionarios" DROP CONSTRAINT "FK_48edc7105a5458696f177e992c9"`);
        await queryRunner.query(`ALTER TABLE "registros_bajas" DROP CONSTRAINT "FK_e068514d0dcd853c5b8e06c33d4"`);
        await queryRunner.query(`ALTER TABLE "registros_bajas" DROP CONSTRAINT "FK_7dd12ee6d33764502fb7974ba31"`);
        await queryRunner.query(`ALTER TABLE "empresas" DROP CONSTRAINT "FK_2d25a87343439a177ffb3d279f5"`);
        await queryRunner.query(`DROP TABLE "categoria_persona"`);
        await queryRunner.query(`DROP TABLE "categoria_registro"`);
        await queryRunner.query(`DROP TABLE "registros_hechos_posteriores"`);
        await queryRunner.query(`DROP TABLE "catalogos"`);
        await queryRunner.query(`DROP TABLE "registros_funcionarios"`);
        await queryRunner.query(`DROP TABLE "registros_bajas"`);
        await queryRunner.query(`DROP TABLE "categoria_funcionario"`);
        await queryRunner.query(`DROP TABLE "empresas"`);
        await queryRunner.query(`DROP TABLE "categoria_empresa"`);
        await queryRunner.query(`DROP TABLE "persona_natural"`);
    }

}
