// src/stages/stage.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { Document } from '../documents/document.entity';

@Entity({ name: 'stages' })
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  // Instead of just a number column, we define the relation.
  @ManyToOne(() => Project, (project) => project.stages, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  project_id: number;

  // Optionally, you can keep a simple column if needed, but the relation is preferred.
  // @Column()
  // project_id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'date' })
  estimated_start_date: Date;

  @Column({ type: 'date' })
  estimated_end_date: Date;

  @Column('numeric')
  stage_budget: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => Document, (document) => document.stage, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  documents: Document[];
}
