// src/projects/dto/create-project.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNumber()
  tenant_id: number;

  @IsNumber()
  owner_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  location: string;

  @IsNotEmpty()
  @IsNumber()
  overall_budget: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
