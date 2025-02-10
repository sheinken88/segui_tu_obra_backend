// src/stages/stages.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { StagesService } from './stages.service';
import { Stage } from './stage.entity';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() stageData: Partial<Stage>): Promise<Stage> {
    return this.stagesService.create(stageData);
  }

  @Get()
  findAll(): Promise<Stage[]> {
    return this.stagesService.findAll();
  }

  // Endpoint to get stages by project id
  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string): Promise<Stage[]> {
    return this.stagesService.findByProject(Number(projectId));
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Stage> {
    const stage = await this.stagesService.findOne(Number(id));
    if (!stage) {
      throw new NotFoundException(`Stage with ID ${id} not found`);
    }
    return stage;
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: Partial<Stage>,
  ): Promise<Stage> {
    return this.stagesService.update(Number(id), updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.stagesService.remove(Number(id));
  }
}
