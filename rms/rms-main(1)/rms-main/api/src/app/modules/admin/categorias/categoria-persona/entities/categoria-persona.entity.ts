import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'categoria_persona'})
export class CategoriaPersona{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS

  @Column({default:1})
  nivel: number;

  @Column({ type: 'varchar', name:'categoria', length: 50 , nullable: false })
  categoria: string;

  @Column({ type: 'varchar', name:'codigo', length: 50 , nullable: true })
  codigo: string;

  @Column({ type: 'varchar', name:'descripcion', length: 250 , nullable: true })
  descripcion: string;

  /******************************AUDIT************************************** */
  // COLUMNS AUDIT
  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', name: 'usuario_creacion',length: 50, default: 'default', select: false })
  userCreate: string;

  @CreateDateColumn({ type: 'timestamp', name: 'fecha_creacion', nullable: false, select: false })
  dateCreate: Date;

  @Column({ type: 'varchar', name: 'usuario_modificacion',length: 50, default: 'default', select: false })
  userUpdate: string;

  @UpdateDateColumn({ type: 'timestamp', name: 'fecha_modificacion', nullable: true, select: false })
  dateUpdate: Date;
}
