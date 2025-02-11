// src/quantity-takeoff/takeoff-item.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Project } from '../projects/project.entity';
import { TakeoffItemAssignment } from './takeoff-item-assignment.entity';

@Entity({ name: 'takeoff_items' })
export class TakeoffItem {
  @PrimaryGeneratedColumn()
  id: number;

  // Each takeoff item is associated with a project.
  @ManyToOne(() => Project, (project) => project.takeoffItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  project_id: number;

  @Column({ length: 255 })
  item_name: string;

  @Column({ length: 255, nullable: true })
  area?: string; // Optional classification

  @Column({ length: 255, nullable: true })
  category?: string; // Optional classification

  @Column('numeric')
  quantity: number; // Total quantity available

  @Column({ length: 50 })
  unit: string;

  @Column('numeric')
  estimated_cost: number;

  @OneToMany(
    () => TakeoffItemAssignment,
    (assignment) => assignment.takeoffItem,
    { cascade: true, onDelete: 'CASCADE' },
  )
  assignments: TakeoffItemAssignment[];

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
