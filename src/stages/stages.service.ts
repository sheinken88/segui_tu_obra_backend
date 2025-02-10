// src/stages/stages.service.ts
import { Injectable } from '@nestjs/common';
import { Stage } from './stage.entity';
import { StageRepository } from './repositories/stage.repository';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Injectable()
export class StagesService {
  constructor(private readonly stageRepository: StageRepository) {}

  create(createStageDto: CreateStageDto): Promise<Stage> {
    return this.stageRepository.createStage(createStageDto);
  }

  findAll(): Promise<Stage[]> {
    return this.stageRepository.findAllStages();
  }

  findOne(id: number): Promise<Stage> {
    return this.stageRepository.findStageById(id);
  }

  findByProject(projectId: number): Promise<Stage[]> {
    return this.stageRepository.findStagesByProject(projectId);
  }

  update(id: number, updateStageDto: UpdateStageDto): Promise<Stage> {
    return this.stageRepository.updateStage(id, updateStageDto);
  }

  remove(id: number): Promise<void> {
    return this.stageRepository.removeStage(id);
  }
}
