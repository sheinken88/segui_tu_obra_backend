// src/quantity-takeoff/dto/create-takeoff-item.dto.ts
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTakeoffItemDto {
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsString()
  item_name: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsString()
  unit: string;

  @IsNotEmpty()
  @IsNumber()
  estimated_cost: number;
}
