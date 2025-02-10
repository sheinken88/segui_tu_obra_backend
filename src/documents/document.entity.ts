// src/documents/document.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'documents' })
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  project_id: number; // Foreign key to projects table

  @Column({ nullable: true })
  stage_id: number; // Foreign key to stages table (nullable)

  @Column({ length: 255 })
  title: string;

  @Column('text')
  file_url: string;

  @Column({ length: 100 })
  document_type: string; // e.g., "blueprint", "diseño", "contrato"

  @Column('text')
  description: string;

  @Column()
  uploaded_by: number; // Foreign key to users table

  @Column({ type: 'timestamp' })
  uploaded_at: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
