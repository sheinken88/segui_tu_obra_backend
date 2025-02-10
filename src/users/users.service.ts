// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findUserByEmail(email);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.createUser(createUserDto);
  }

  async findById(id: number): Promise<User> {
    return this.usersRepository.findUserById(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return this.usersRepository.updateUser(id, updateUserDto);
  }

  async remove(id: number): Promise<void> {
    return this.usersRepository.removeUser(id);
  }
}
