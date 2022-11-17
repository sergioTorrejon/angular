import {
  CategoriaEmpresa,
} from 'src/app/modules/admin/categorias/categoria-empresa/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'empresas'})
export class Empresa{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS
  @Column({ type: 'varchar', name:'codigo' ,length: 50 , nullable: false })
  codigo: string;
  
  @Column({ type: 'varchar', name:'sigla' ,length: 50 , nullable: true })
  sigla: string;

  @Column({ type: 'varchar', name:'nombre' ,length: 250 , nullable: true })
  nombre: string;

  @Column({ type: 'varchar', name:'nombre_corto' ,length: 250 , nullable: true })
  nombreCorto: string;

  @Column({ type: 'varchar', name:'nro_seprem' ,length: 50 , nullable: true })
  nroSeprem: string;

  @Column({ type: 'varchar', name:'nit' ,length: 50 , nullable: true })
  nit: string;

  @Column({ type: 'varchar', name:'email' ,length: 250 , nullable: true })
  email: string;

  @Column({ type: 'varchar', name:'telefono' ,length: 250 , nullable: true })
  telefono: string;

  @Column({ type: 'varchar', name:'direccion' ,length: 250 , nullable: true })
  direccion: string;

  @ManyToOne((type) => CategoriaEmpresa)
  @JoinColumn({name:'id_tipo_empresa'})
  idTipoEmpresa: CategoriaEmpresa

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
