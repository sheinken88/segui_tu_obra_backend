// src/expenses/dto/create-expense.dto.ts
import { IsNotEmpty, IsNumber, IsDateString, IsString } from 'class-validator';

export class CreateExpenseDto {
  @IsNumber()
  stage_id: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  expense_date: Date;
}
