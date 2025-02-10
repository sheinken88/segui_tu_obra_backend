// src/projects/projects.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async create(projectData: Partial<Project>): Promise<Project> {
    const project = this.projectsRepository.create(projectData);
    return this.projectsRepository.save(project);
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.projectsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateData: Partial<Project>): Promise<Project> {
    await this.projectsRepository.update(id, updateData);
    const updated = await this.findOne(id);
    if (!updated) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return updated;
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
