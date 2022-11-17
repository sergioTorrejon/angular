import {
  CategoriaFuncionario,
} from 'src/app/modules/admin/categorias/categoria-funcionario/entities/categoria-funcionario.entity';
import { CategoriaRegistro } from 'src/app/modules/admin/categorias/categoria-registro/entities';
import {
  RegistrosFuncionarios,
} from 'src/app/modules/registros-funcionarios/entities';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({name:'registros_bajas'})
export class RegistrosBajas{
  //PRIMARY KEY GUID AUTOCLAVE STRING
  @PrimaryGeneratedColumn()
  id: number;
  // COLUMNS TABLE USERS
  @ManyToOne((type) => RegistrosFuncionarios, (registrosFuncionarios) => registrosFuncionarios.bajas)
  @JoinColumn({name:'id_registro_funcionario'})
  funcionario: RegistrosFuncionarios


  @ManyToOne((type) => CategoriaRegistro)
  @JoinColumn({name:'id_categoria_funcionario'})
  categoriaBaja: CategoriaRegistro

  @Column({ type: 'varchar', length: 4 })
  nroBaja: string;

  @Column({name:'fecha_baja', nullable:true})
  fechaBaja: Date;

  @Column({ type: 'text', nullable:true })
  comentarios: string;
  

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
