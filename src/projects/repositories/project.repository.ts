// src/projects/repositories/project.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../project.entity';
import { CreateProjectDto } from '../dto/create-project.dto';
import { UpdateProjectDto } from '../dto/update-project.dto';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async createProject(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.repo.create(createProjectDto);
    return this.repo.save(project);
  }

  async findAllProjects(): Promise<Project[]> {
    return this.repo.find();
  }

  async findProjectById(id: number): Promise<Project> {
    const project = await this.repo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async updateProject(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    await this.repo.update(id, updateProjectDto);
    return this.findProjectById(id);
  }

  async removeProject(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}
