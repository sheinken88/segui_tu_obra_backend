// src/quantity-takeoff/dto/create-takeoff-item.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateTakeoffItemAssignmentDto } from './create-takeoff-item-assignment.dto';

export class CreateTakeoffItemDto {
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  estimated_cost: number;

  // Optional assignments to stages
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTakeoffItemAssignmentDto)
  assignments?: CreateTakeoffItemAssignmentDto[];
}
