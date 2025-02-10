// src/projects/dto/update-project.dto.ts
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateProjectDto {
  @IsOptional()
  @IsNumber()
  tenant_id?: number;

  @IsOptional()
  @IsNumber()
  owner_id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsNumber()
  overall_budget?: number;

  @IsOptional()
  @IsString()
  description?: string;
}
