import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './schemas/project.schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(technology?: string): Promise<ProjectDocument[]> {
    if (technology) {
      return this.projectModel.find({ technologies: technology }).exec();
    }
    return this.projectModel.find().exec();
  }

  async findFeatured(): Promise<ProjectDocument[]> {
    return this.projectModel.find({ featured: true }).exec();
  }

  async findOne(id: string): Promise<ProjectDocument> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    const newProject = new this.projectModel(createProjectDto);
    return newProject.save();
  }

  async update(id: string, updateProjectDto: UpdateProjectDto): Promise<ProjectDocument> {
    const existingProject = await this.projectModel
      .findByIdAndUpdate(id, updateProjectDto, { new: true })
      .exec();
      
    if (!existingProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return existingProject;
  }

  async remove(id: string): Promise<ProjectDocument> {
    const deletedProject = await this.projectModel.findByIdAndDelete(id).exec();
    if (!deletedProject) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return deletedProject;
  }
}