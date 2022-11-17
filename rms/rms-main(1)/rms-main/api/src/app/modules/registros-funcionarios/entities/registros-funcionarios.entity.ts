import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CategoriaFuncionario } from '../../admin/categorias/categoria-funcionario/entities';

import { Empresa } from '../../empresa/entities';
import { PersonaNatural } from '../../persona-natural/entities';
import { RegistrosBajas } from '../../registros/registros-bajas/entities';

@Entity({name:'registros_funcionarios'})
export class RegistrosFuncionarios{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS

  @ManyToOne(() => PersonaNatural)
  @JoinColumn({name:'id_persona'})
  personaNatural: PersonaNatural

  @ManyToOne(() => Empresa)
  @JoinColumn({name:'id_empresa'})
  empresa: Empresa

  @ManyToOne(() => CategoriaFuncionario)
  @JoinColumn({name:'id_tipo_cargo'})
  tipoCargo: CategoriaFuncionario;

  @Column({ type: 'varchar', name: 'estado',length: 50 })
  estado: string;

  @Column({ type: 'varchar', name: 'cargo',length: 50 })
  cargo: string;

  @Column({ type: 'varchar', name: 'ciudad',length: 50 , nullable:true})
  ciudad: string;

  @Column({ type: 'varchar', name: 'nro_contrato',length: 50 , nullable:true })
  nroContrato: string;

  @Column({ type: 'timestamp', name: 'fecha_ingreso' , nullable:true})
  fechaIngreso: string;

  @Column({ type: 'varchar', name: 'nro_representacion_legal',length: 50 , nullable:true})
  nroRepresentacionLegal: string;

  @Column({ type: 'timestamp', name: 'fecha_inicio_representacion_legal', nullable:true })
  fechaInicioRepresentacionLegal: string;

  @Column({ type: 'timestamp', name: 'fecha_fin_representacion_legal' , nullable:true})
  fechaFinRepresentacionLegal: string;

  @OneToMany(() => RegistrosBajas, registrosBajas => registrosBajas.funcionario)
  bajas: RegistrosBajas[];

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
