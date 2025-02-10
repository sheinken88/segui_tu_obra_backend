// src/stages/stages.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { StagesService } from './stages.service';
import { Stage } from './stage.entity';
import { CreateStageDto } from './dto/create-stage.dto';
import { UpdateStageDto } from './dto/update-stage.dto';

@Controller('stages')
export class StagesController {
  constructor(private readonly stagesService: StagesService) {}

  @Post()
  create(@Body() createStageDto: CreateStageDto): Promise<Stage> {
    return this.stagesService.create(createStageDto);
  }

  @Get()
  findAll(): Promise<Stage[]> {
    return this.stagesService.findAll();
  }

  @Get('project/:projectId')
  findByProject(@Param('projectId') projectId: string): Promise<Stage[]> {
    return this.stagesService.findByProject(Number(projectId));
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Stage> {
    return this.stagesService.findOne(Number(id));
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateStageDto: UpdateStageDto,
  ): Promise<Stage> {
    return this.stagesService.update(Number(id), updateStageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    await this.stagesService.remove(Number(id));
    return { message: `Stage with ID ${id} deleted successfully` };
  }
}
