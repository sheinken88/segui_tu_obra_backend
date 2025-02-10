// src/users/user.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum UserRole {
  HOMEOWNER = 'homeowner',
  CONTRACTOR = 'contractor',
  SUPER_ADMIN = 'super_admin',
}

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tenant_id: number; // In a multi-tenant system, this ties the user to a tenant

  @Column({ length: 255 })
  name: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  role: UserRole; // 'homeowner', 'contractor', 'super_admin'

  @Column({ name: 'password_hash' })
  password_hash: string; // Store the hashed password

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
