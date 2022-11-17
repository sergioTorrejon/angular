import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'persona_natural'})
export class PersonaNatural{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS
  @Column({ type: 'varchar', name:'nro_identificacion' ,length: 50 , nullable: true })
  nroIdentificacion: string;

  @Column({ type: 'varchar', name:'primer_nombre_persona' ,length: 250 , nullable: true })
  PrimerNombrePersona: string;

  @Column({ type: 'varchar', name:'segundo_nombre_persona' ,length: 250 , nullable: true })
  SegundoNombrePersona: string;

  @Column({ type: 'varchar', name:'primer_apellido_persona' ,length: 50 , nullable: true })
  PrimerApellidoPersona: string;

  @Column({ type: 'varchar', name:'segundo_apellido_persona' ,length: 50 , nullable: true })
  SegundoApellidoPersona: string;

  @Column({ type: 'varchar', name:'tipo_identificacion' ,length: 250 , nullable: true })
  tipoIdentificacion: string;

  @Column({ type: 'varchar', name:'email' ,length: 250 , nullable: true })
  email: string;

  @Column({ type: 'varchar', name:'telefono' ,length: 250 , nullable: true })
  telefono: string;

  @Column({ type: 'varchar', name:'direccion' ,length: 250 , nullable: true })
  direccion: string;


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
