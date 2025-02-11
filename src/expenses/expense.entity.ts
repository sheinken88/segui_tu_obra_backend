// src/expenses/expense.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Stage } from '../stages/stage.entity';

@Entity({ name: 'expenses' })
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  // Relate the expense to a stage. Cascade delete is applied so that if a stage is deleted, its expenses are also removed.
  @ManyToOne(() => Stage, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stage_id' })
  stage: Stage;

  // We keep the foreign key column as well for ease of access.
  @Column()
  stage_id: number;

  @Column('text')
  description: string;

  @Column('numeric')
  amount: number;

  @Column({ type: 'date' })
  expense_date: Date;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
