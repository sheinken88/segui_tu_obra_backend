// src/documents/repositories/document.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from '../document.entity';
import { CreateDocumentDto } from '../dto/create-document.dto';
import { UpdateDocumentDto } from '../dto/update-document.dto';

@Injectable()
export class DocumentRepository {
  constructor(
    @InjectRepository(Document)
    private readonly repo: Repository<Document>,
  ) {}

  async createDocument(
    createDocumentDto: CreateDocumentDto,
  ): Promise<Document> {
    const document = this.repo.create(createDocumentDto);
    return this.repo.save(document);
  }

  async findAllDocuments(): Promise<Document[]> {
    return this.repo.find();
  }

  async findDocumentById(id: number): Promise<Document> {
    const document = await this.repo.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async updateDocument(
    id: number,
    updateDocumentDto: UpdateDocumentDto,
  ): Promise<Document> {
    await this.repo.update(id, updateDocumentDto);
    return this.findDocumentById(id);
  }

  async removeDocument(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
