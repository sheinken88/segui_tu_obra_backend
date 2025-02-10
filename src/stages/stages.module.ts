// src/stages/stages.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stage } from './stage.entity';
import { StagesController } from './stages.controller';
import { StagesService } from './stages.service';
import { StageRepository } from './repositories/stage.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Stage])],
  controllers: [StagesController],
  providers: [StagesService, StageRepository],
})
export class StagesModule {}
