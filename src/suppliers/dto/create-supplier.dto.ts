// src/suppliers/dto/create-supplier.dto.ts
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSupplierDto {
  @IsNumber()
  tenant_id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  contact_info: string;
}
