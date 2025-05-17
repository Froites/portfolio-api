import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Service, ServiceDocument } from './schemas/service.schema';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service.name) private serviceModel: Model<ServiceDocument>,
  ) {}

  async findAll(): Promise<ServiceDocument[]> {
    return this.serviceModel.find().exec();
  }

  async findOne(id: string): Promise<ServiceDocument> {
    const service = await this.serviceModel.findById(id).exec();
    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return service;
  }

  async create(createServiceDto: CreateServiceDto): Promise<ServiceDocument> {
    const newService = new this.serviceModel(createServiceDto);
    return newService.save();
  }

  async update(id: string, updateServiceDto: UpdateServiceDto): Promise<ServiceDocument> {
    const existingService = await this.serviceModel
      .findByIdAndUpdate(id, updateServiceDto, { new: true })
      .exec();
      
    if (!existingService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return existingService;
  }

  async remove(id: string): Promise<ServiceDocument> {
    const deletedService = await this.serviceModel.findByIdAndDelete(id).exec();
    if (!deletedService) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }
    return deletedService;
  }
}