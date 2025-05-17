import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Skill, SkillDocument } from './schemas/skill.schema';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';

@Injectable()
export class SkillsService {
  constructor(
    @InjectModel(Skill.name) private skillModel: Model<SkillDocument>,
  ) {}

  async findAll(category?: string): Promise<SkillDocument[]> {
    if (category) {
      return this.skillModel.find({ category }).exec();
    }
    return this.skillModel.find().exec();
  }

  async findOne(id: string): Promise<SkillDocument> {
    const skill = await this.skillModel.findById(id).exec();
    if (!skill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return skill;
  }

  async create(createSkillDto: CreateSkillDto): Promise<SkillDocument> {
    const newSkill = new this.skillModel(createSkillDto);
    return newSkill.save();
  }

  async update(id: string, updateSkillDto: UpdateSkillDto): Promise<SkillDocument> {
    const existingSkill = await this.skillModel
      .findByIdAndUpdate(id, updateSkillDto, { new: true })
      .exec();
      
    if (!existingSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return existingSkill;
  }

  async remove(id: string): Promise<SkillDocument> {
    const deletedSkill = await this.skillModel.findByIdAndDelete(id).exec();
    if (!deletedSkill) {
      throw new NotFoundException(`Skill with ID ${id} not found`);
    }
    return deletedSkill;
  }
}