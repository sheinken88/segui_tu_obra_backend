// src/stages/stages.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from './stage.entity';

@Injectable()
export class StagesService {
  constructor(
    @InjectRepository(Stage)
    private stagesRepository: Repository<Stage>,
  ) {}

  async create(stageData: Partial<Stage>): Promise<Stage> {
    const stage = this.stagesRepository.create(stageData);
    return this.stagesRepository.save(stage);
  }

  async findAll(): Promise<Stage[]> {
    return this.stagesRepository.find();
  }

  async findByProject(projectId: number): Promise<Stage[]> {
    return this.stagesRepository.find({ where: { project_id: projectId } });
  }

  async findOne(id: number): Promise<Stage | null> {
    return this.stagesRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<Stage>): Promise<Stage> {
    await this.stagesRepository.update(id, updateData);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.stagesRepository.delete(id);
  }
}
