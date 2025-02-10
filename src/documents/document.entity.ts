// src/documents/document.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { Stage } from '../stages/stage.entity';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  // Relation to Project
  @ManyToOne(() => Project, (project) => project.documents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  project_id: number;

  // Relation to Stage is optional; mark as nullable if a document can exist without a stage.
  @ManyToOne(() => Stage, (stage) => stage.documents, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'stage_id' })
  stage: Stage;

  @Column({ nullable: true })
  stage_id: number;

  @Column({ length: 255 })
  title: string;

  @Column('text')
  file_url: string;

  @Column({ length: 100 })
  document_type: string;

  @Column('text')
  description: string;

  @Column()
  uploaded_by: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  uploaded_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
