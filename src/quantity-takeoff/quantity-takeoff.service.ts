// src/quantity-takeoff/quantity-takeoff.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TakeoffItem } from './takeoff-item.entity';
import { CreateTakeoffItemDto } from './dto/create-takeoff-item.dto';
import { UpdateTakeoffItemDto } from './dto/update-takeoff-item.dto';
import { TakeoffItemAssignment } from './takeoff-item-assignment.entity';
import { CreateTakeoffItemAssignmentDto } from './dto/create-takeoff-item-assignment.dto';
import { UpdateTakeoffItemAssignmentDto } from './dto/update-takeoff-item-assignment.dto';

@Injectable()
export class QuantityTakeoffService {
  constructor(
    @InjectRepository(TakeoffItem)
    private itemRepository: Repository<TakeoffItem>,
    @InjectRepository(TakeoffItemAssignment)
    private assignmentRepository: Repository<TakeoffItemAssignment>,
  ) {}

  // Methods for Takeoff Items
  async createItem(createDto: CreateTakeoffItemDto): Promise<TakeoffItem> {
    const item = this.itemRepository.create(createDto);
    return this.itemRepository.save(item);
  }

  async findAllItems(): Promise<TakeoffItem[]> {
    return this.itemRepository.find({ relations: ['assignments'] });
  }

  async findItem(id: number): Promise<TakeoffItem> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['assignments'],
    });
    if (!item) {
      throw new NotFoundException(`Takeoff item with ID ${id} not found`);
    }
    return item;
  }

  async updateItem(
    id: number,
    updateDto: UpdateTakeoffItemDto,
  ): Promise<TakeoffItem> {
    await this.itemRepository.update(id, updateDto);
    return this.findItem(id);
  }

  async removeItem(id: number): Promise<{ message: string }> {
    await this.itemRepository.delete(id);
    return { message: `Takeoff item with ID ${id} deleted successfully` };
  }

  // Methods for Assignments
  async createAssignment(
    createDto: CreateTakeoffItemAssignmentDto,
  ): Promise<TakeoffItemAssignment> {
    const assignment = this.assignmentRepository.create(createDto);
    return this.assignmentRepository.save(assignment);
  }

  async findAllAssignments(): Promise<TakeoffItemAssignment[]> {
    return this.assignmentRepository.find();
  }

  async findAssignment(id: number): Promise<TakeoffItemAssignment> {
    const assignment = await this.assignmentRepository.findOne({
      where: { id },
    });
    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }
    return assignment;
  }

  async updateAssignment(
    id: number,
    updateDto: UpdateTakeoffItemAssignmentDto,
  ): Promise<TakeoffItemAssignment> {
    await this.assignmentRepository.update(id, updateDto);
    return this.findAssignment(id);
  }

  async removeAssignment(id: number): Promise<{ message: string }> {
    await this.assignmentRepository.delete(id);
    return { message: `Assignment with ID ${id} deleted successfully` };
  }
}
