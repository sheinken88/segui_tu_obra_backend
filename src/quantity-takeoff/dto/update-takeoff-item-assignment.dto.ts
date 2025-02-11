// src/quantity-takeoff/dto/update-takeoff-item-assignment.dto.ts
import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTakeoffItemAssignmentDto {
  @IsOptional()
  @IsNumber()
  takeoff_item_id?: number;

  @IsOptional()
  @IsNumber()
  stage_id?: number;

  @IsOptional()
  @IsNumber()
  assigned_quantity?: number;
}
