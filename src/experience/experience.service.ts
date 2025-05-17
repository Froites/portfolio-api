import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Experience, ExperienceDocument } from './schemas/experience.schema';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';

@Injectable()
export class ExperienceService {
  constructor(
    @InjectModel(Experience.name) private experienceModel: Model<ExperienceDocument>,
  ) {}

  async findAll(): Promise<ExperienceDocument[]> {
    // Ordenado do mais recente para o mais antigo
    return this.experienceModel
      .find()
      .sort({ startDate: -1 })
      .exec();
  }

  async findOne(id: string): Promise<ExperienceDocument> {
    const experience = await this.experienceModel.findById(id).exec();
    if (!experience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return experience;
  }

  async create(createExperienceDto: CreateExperienceDto): Promise<ExperienceDocument> {
    const newExperience = new this.experienceModel(createExperienceDto);
    return newExperience.save();
  }

  async update(id: string, updateExperienceDto: UpdateExperienceDto): Promise<ExperienceDocument> {
    const existingExperience = await this.experienceModel
      .findByIdAndUpdate(id, updateExperienceDto, { new: true })
      .exec();
      
    if (!existingExperience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return existingExperience;
  }

  async remove(id: string): Promise<ExperienceDocument> {
    const deletedExperience = await this.experienceModel.findByIdAndDelete(id).exec();
    if (!deletedExperience) {
      throw new NotFoundException(`Experience with ID ${id} not found`);
    }
    return deletedExperience;
  }
}