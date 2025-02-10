// src/users/repositories/users.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const password_hash = await bcrypt.hash(createUserDto.password, 10);
    const user = this.repo.create({
      ...createUserDto,
      password_hash,
    });
    return this.repo.save(user);
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    const user = await this.repo.findOne({ where: { email } });
    return user || undefined;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.repo.update(id, updateUserDto);
    return this.findUserById(id);
  }

  async removeUser(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
