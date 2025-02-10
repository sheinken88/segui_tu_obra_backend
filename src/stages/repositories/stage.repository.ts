// src/stages/repositories/stage.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stage } from '../stage.entity';
import { CreateStageDto } from '../dto/create-stage.dto';
import { UpdateStageDto } from '../dto/update-stage.dto';

@Injectable()
export class StageRepository {
  constructor(
    @InjectRepository(Stage)
    private readonly repo: Repository<Stage>,
  ) {}

  async createStage(createStageDto: CreateStageDto): Promise<Stage> {
    const stage = this.repo.create(createStageDto);
    return this.repo.save(stage);
  }

  async findAllStages(): Promise<Stage[]> {
    return this.repo.find();
  }

  async findStageById(id: number): Promise<Stage> {
    const stage = await this.repo.findOne({ where: { id } });
    if (!stage) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }
    return stage;
  }

  async findStagesByProject(projectId: number): Promise<Stage[]> {
    return this.repo.find({ where: { project_id: projectId } });
  }

  async updateStage(
    id: number,
    updateStageDto: UpdateStageDto,
  ): Promise<Stage> {
    await this.repo.update(id, updateStageDto);
    return this.findStageById(id);
  }

  async removeStage(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
