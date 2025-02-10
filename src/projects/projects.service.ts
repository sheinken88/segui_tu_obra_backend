// src/projects/projects.service.ts
import { Injectable } from '@nestjs/common';
import { Project } from './project.entity';
import { ProjectRepository } from './repositories/project.repository';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly projectRepository: ProjectRepository) {}

  create(createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectRepository.createProject(createProjectDto);
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.findAllProjects();
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findProjectById(id);
  }

  update(id: number, updateProjectDto: UpdateProjectDto): Promise<Project> {
    return this.projectRepository.updateProject(id, updateProjectDto);
  }

  remove(id: number): Promise<void> {
    return this.projectRepository.removeProject(id);
  }
}
