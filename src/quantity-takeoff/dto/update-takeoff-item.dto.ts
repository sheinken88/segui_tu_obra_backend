// src/quantity-takeoff/dto/update-takeoff-item.dto.ts
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateTakeoffItemDto {
  @IsOptional()
  @IsNumber()
  project_id?: number;

  @IsOptional()
  @IsString()
  item_name?: string;

  @IsOptional()
  @IsString()
  area?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsNumber()
  estimated_cost?: number;
}
