// src/stages/dto/create-stage.dto.ts
import { IsNotEmpty, IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateStageDto {
  @IsNumber()
  project_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDateString()
  estimated_start_date: Date;

  @IsNotEmpty()
  @IsDateString()
  estimated_end_date: Date;

  @IsNotEmpty()
  @IsNumber()
  stage_budget: number;
}
