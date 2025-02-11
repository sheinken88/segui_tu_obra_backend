// src/quantity-takeoff/dto/create-takeoff-item-assignment.dto.ts
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTakeoffItemAssignmentDto {
  @IsNumber()
  takeoff_item_id: number;

  @IsNumber()
  stage_id: number;

  @IsNotEmpty()
  @IsNumber()
  assigned_quantity: number;
}
