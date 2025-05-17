import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ExperienceService } from './experience.service';
import { CreateExperienceDto } from './dto/create-experience.dto';
import { UpdateExperienceDto } from './dto/update-experience.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('experience')
@Controller('experience')
export class ExperienceController {
  constructor(private readonly experienceService: ExperienceService) {}

  @Get()
  async findAll() {
    return this.experienceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.experienceService.findOne(id);
  }

  @Post()
  async create(@Body() createExperienceDto: CreateExperienceDto) {
    return this.experienceService.create(createExperienceDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateExperienceDto: UpdateExperienceDto) {
    return this.experienceService.update(id, updateExperienceDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.experienceService.remove(id);
  }
}