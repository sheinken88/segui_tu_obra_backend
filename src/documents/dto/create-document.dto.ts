// src/documents/dto/create-document.dto.ts
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateDocumentDto {
  @IsNumber()
  project_id: number;

  @IsOptional()
  @IsNumber()
  stage_id?: number;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsUrl()
  file_url: string;

  @IsNotEmpty()
  @IsString()
  document_type: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  uploaded_by: number;

  @IsOptional()
  uploaded_at?: Date;
}
