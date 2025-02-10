// src/documents/documents.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private documentsRepository: Repository<Document>,
  ) {}

  async create(documentData: Partial<Document>): Promise<Document> {
    const document = this.documentsRepository.create(documentData);
    return this.documentsRepository.save(document);
  }

  async findAll(): Promise<Document[]> {
    return this.documentsRepository.find();
  }

  async findOne(id: number): Promise<Document> {
    const document = await this.documentsRepository.findOne({ where: { id } });
    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return document;
  }

  async update(id: number, updateData: Partial<Document>): Promise<Document> {
    await this.documentsRepository.update(id, updateData);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.documentsRepository.delete(id);
  }
}
