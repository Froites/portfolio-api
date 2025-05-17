import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDocument } from './schemas/profile.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<ProfileDocument>,
  ) {}

  async findOne(): Promise<ProfileDocument | null> {
    // Como só teremos um perfil, retornamos o primeiro
    const profiles = await this.profileModel.find().exec();
    return profiles[0] || null;
  }

  async create(createProfileDto: CreateProfileDto): Promise<ProfileDocument> {
    // Primeiro verificamos se já existe um perfil
    const existingProfile = await this.findOne();
    if (existingProfile) {
      throw new Error('Perfil já existe. Use o método de atualização.');
    }
    
    const newProfile = new this.profileModel(createProfileDto);
    return newProfile.save();
  }

  async update(updateProfileDto: UpdateProfileDto): Promise<ProfileDocument | null> {
    const profile = await this.findOne();
    if (!profile) {
      throw new Error('Perfil não encontrado');
    }
    
    return this.profileModel.findByIdAndUpdate(
      profile._id, 
      updateProfileDto, 
      { new: true }
    ).exec();
  }
}