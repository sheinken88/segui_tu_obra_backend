// src/quantity-takeoff/quantity-takeoff.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { QuantityTakeoffService } from './quantity-takeoff.service';
import { TakeoffItem } from './takeoff-item.entity';
import { CreateTakeoffItemDto } from './dto/create-takeoff-item.dto';
import { UpdateTakeoffItemDto } from './dto/update-takeoff-item.dto';
import { TakeoffItemAssignment } from './takeoff-item-assignment.entity';
import { CreateTakeoffItemAssignmentDto } from './dto/create-takeoff-item-assignment.dto';
import { UpdateTakeoffItemAssignmentDto } from './dto/update-takeoff-item-assignment.dto';

@Controller('quantity-takeoff')
export class QuantityTakeoffController {
  constructor(private readonly takeoffService: QuantityTakeoffService) {}

  // Endpoints for Takeoff Items
  @Post('items')
  createItem(@Body() createDto: CreateTakeoffItemDto): Promise<TakeoffItem> {
    return this.takeoffService.createItem(createDto);
  }

  @Get('items')
  findAllItems(): Promise<TakeoffItem[]> {
    return this.takeoffService.findAllItems();
  }

  @Get('items/:id')
  findItem(@Param('id') id: string): Promise<TakeoffItem> {
    return this.takeoffService.findItem(Number(id));
  }

  @Put('items/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateDto: UpdateTakeoffItemDto,
  ): Promise<TakeoffItem> {
    return this.takeoffService.updateItem(Number(id), updateDto);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string): Promise<{ message: string }> {
    return this.takeoffService.removeItem(Number(id));
  }

  // Endpoints for Takeoff Item Assignments
  @Post('assignments')
  createAssignment(
    @Body() createDto: CreateTakeoffItemAssignmentDto,
  ): Promise<TakeoffItemAssignment> {
    return this.takeoffService.createAssignment(createDto);
  }

  @Get('assignments')
  findAllAssignments(): Promise<TakeoffItemAssignment[]> {
    return this.takeoffService.findAllAssignments();
  }

  @Get('assignments/:id')
  findAssignment(@Param('id') id: string): Promise<TakeoffItemAssignment> {
    return this.takeoffService.findAssignment(Number(id));
  }

  @Put('assignments/:id')
  updateAssignment(
    @Param('id') id: string,
    @Body() updateDto: UpdateTakeoffItemAssignmentDto,
  ): Promise<TakeoffItemAssignment> {
    return this.takeoffService.updateAssignment(Number(id), updateDto);
  }

  @Delete('assignments/:id')
  removeAssignment(@Param('id') id: string): Promise<{ message: string }> {
    return this.takeoffService.removeAssignment(Number(id));
  }
}
