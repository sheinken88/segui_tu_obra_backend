// src/stages/stage.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'stages' })
export class Stage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number; // Foreign key to projects table

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
}
