// src/documents/documents.service.ts
import { Injectable } from '@nestjs/common';
import { Document } from './document.entity';
import { DocumentRepository } from './repositories/document.repository';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(private readonly documentRepository: DocumentRepository) {}

  create(createDocumentDto: CreateDocumentDto): Promise<Document> {
    return this.documentRepository.createDocument(createDocumentDto);
  }

  findAll(): Promise<Document[]> {
    return this.documentRepository.findAllDocuments();
  }

  findOne(id: number): Promise<Document> {
    return this.documentRepository.findDocumentById(id);
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto): Promise<Document> {
    return this.documentRepository.updateDocument(id, updateDocumentDto);
  }

  remove(id: number): Promise<void> {
    return this.documentRepository.removeDocument(id);
  }
}
