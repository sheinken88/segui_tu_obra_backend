// src/quantity-takeoff/quantity-takeoff.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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

  // Create a takeoff item with integrated assignments
  async createItem(createDto: CreateTakeoffItemDto): Promise<TakeoffItem> {
    const { assignments, ...itemData } = createDto;
    // Create the item record
    const item = this.itemRepository.create(itemData);
    const savedItem = await this.itemRepository.save(item);

    // If assignments are provided, process them
    if (assignments && assignments.length > 0) {
      const totalAssigned = assignments.reduce(
        (sum, a) => sum + a.assigned_quantity,
        0,
      );
      if (totalAssigned > savedItem.quantity) {
        throw new BadRequestException(
          `Total assigned quantity (${totalAssigned}) exceeds the total item quantity (${savedItem.quantity})`,
        );
      }
      // Create assignment records one-by-one
      for (const assignmentDto of assignments) {
        const assignment = this.assignmentRepository.create({
          ...assignmentDto,
          takeoff_item_id: savedItem.id,
        });
        await this.assignmentRepository.save([assignment]); // Save as an array
      }
      // Use our findItem method to ensure a non-null result
      return this.findItem(savedItem.id);
    }
    return savedItem;
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

  // Updated updateItem method: when updating quantity, adjust assignments proportionally.
  async updateItem(
    id: number,
    updateDto: UpdateTakeoffItemDto,
  ): Promise<TakeoffItem> {
    // Retrieve the current item including its assignments.
    const item = await this.findItem(id);

    if (updateDto.quantity !== undefined) {
      const newTotal = updateDto.quantity;
      const oldTotal = item.quantity;

      if (oldTotal <= 0) {
        throw new BadRequestException(
          'Original total quantity must be greater than zero',
        );
      }

      // Recalculate each assignment proportionally.
      for (const assignment of item.assignments) {
        const proportion = assignment.assigned_quantity / oldTotal;
        const newAssigned = newTotal * proportion;
        await this.assignmentRepository.update(assignment.id, {
          assigned_quantity: newAssigned,
        });
      }
    }

    // Update the takeoff item with the new data.
    await this.itemRepository.update(id, updateDto);

    // Return the updated item with assignments.
    return this.findItem(id);
  }

  async removeItem(id: number): Promise<{ message: string }> {
    await this.itemRepository.delete(id);
    return { message: `Takeoff item with ID ${id} deleted successfully` };
  }

  // Methods for assignments (if managed separately)
  async createAssignment(
    createDto: CreateTakeoffItemAssignmentDto,
  ): Promise<TakeoffItemAssignment> {
    const assignment = this.assignmentRepository.create(createDto);
    const savedAssignments = await this.assignmentRepository.save([assignment]);
    return savedAssignments[0]; // Return the first (and only) saved assignment.
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
