// src/projects/project.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Stage } from '../stages/stage.entity';
import { Document } from '../documents/document.entity';
import { TakeoffItem } from '../quantity-takeoff/takeoff-item.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number;

  @Column()
  owner_id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  location: string;

  @Column('numeric')
  overall_budget: number;

  @Column('text')
  description: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Stage, (stage) => stage.project, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  stages: Stage[];

  @OneToMany(() => Document, (document) => document.project, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  documents: Document[];

  @OneToMany(() => TakeoffItem, (takeoffItem) => takeoffItem.project, {
    cascade: true,
    onDelete: 'CASCADE',
    eager: true,
  })
  takeoffItems: TakeoffItem[];
}
