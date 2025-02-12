// src/suppliers/dto/update-supplier.dto.ts
import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateSupplierDto {
  @IsOptional()
  @IsNumber()
  tenant_id?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  contact_info?: string;
}
