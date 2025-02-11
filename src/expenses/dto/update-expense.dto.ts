// src/expenses/dto/update-expense.dto.ts
import { IsOptional, IsNumber, IsDateString, IsString } from 'class-validator';

export class UpdateExpenseDto {
  @IsOptional()
  @IsNumber()
  stage_id?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsDateString()
  expense_date?: Date;
}
