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

  // Link the item to a project.
  @ManyToOne(() => Project, (project) => project.takeoffItems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'project_id' })
  project: Project;

  @Column()
  project_id: number;

  @Column({ length: 255 })
  item_name: string;

  // Removed area as per new requirements.
  @Column({ length: 255 })
  category: string;

  @Column('numeric')
  quantity: number; // The total quantity needed for the item

  @Column({ length: 50 })
  unit: string;

  @Column('numeric')
  estimated_cost: number;

  // A takeoff item may have multiple assignments (one for each stage where it's used).
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
