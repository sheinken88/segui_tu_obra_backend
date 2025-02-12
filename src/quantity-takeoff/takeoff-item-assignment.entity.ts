// src/quantity-takeoff/takeoff-item-assignment.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TakeoffItem } from './takeoff-item.entity';
import { Stage } from '../stages/stage.entity';

@Entity({ name: 'takeoff_item_assignments' })
export class TakeoffItemAssignment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => TakeoffItem, (item) => item.assignments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'takeoff_item_id' })
  takeoffItem: TakeoffItem;

  @Column()
  takeoff_item_id: number;

  @ManyToOne(() => Stage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stage_id' })
  stage: Stage;

  @Column()
  stage_id: number;

  @Column('numeric')
  assigned_quantity: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
