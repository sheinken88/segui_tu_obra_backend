// src/documents/dto/update-document.dto.ts
import { IsOptional, IsNumber, IsString, IsUrl } from 'class-validator';

export class UpdateDocumentDto {
  @IsOptional()
  @IsNumber()
  project_id?: number;

  @IsOptional()
  @IsNumber()
  stage_id?: number;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsUrl()
  file_url?: string;

  @IsOptional()
  @IsString()
  document_type?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  uploaded_by?: number;

  @IsOptional()
  uploaded_at?: Date;
}
