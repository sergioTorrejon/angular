import {
  CategoriaFuncionario,
} from 'src/app/modules/admin/categorias/categoria-funcionario/entities/categoria-funcionario.entity';
import { CategoriaRegistro } from 'src/app/modules/admin/categorias/categoria-registro/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { RegistrosBajas } from '../../registros-bajas/entities';

@Entity({name:'registros_hechos_posteriores'})
export class RegistrosHechosPosteriores{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS
  @ManyToOne((type) => RegistrosBajas)
  @JoinColumn({name:'id_registros_baja'})
  registroBaja: RegistrosBajas

  @ManyToOne((type) => CategoriaRegistro)
  @JoinColumn({name:'id_categoria_funcionario'})
  causal: CategoriaRegistro

  @Column({name:'fecha_registro', nullable:true})
  fecha: Date;

  @Column({ type: 'text', nullable:true })
  descripcion: string;

  @Column({ type: 'varchar', name: 'estado',length: 50 })
  estado: string;
  

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
