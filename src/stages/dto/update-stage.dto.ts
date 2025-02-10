// src/stages/dto/update-stage.dto.ts
import { IsOptional, IsNumber, IsString, IsDateString } from 'class-validator';

export class UpdateStageDto {
  @IsOptional()
  @IsNumber()
  project_id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  estimated_start_date?: Date;

  @IsOptional()
  @IsDateString()
  estimated_end_date?: Date;

  @IsOptional()
  @IsNumber()
  stage_budget?: number;
}
