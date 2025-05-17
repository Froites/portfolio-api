import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { SkillsService } from './skills.service';
import { CreateSkillDto } from './dto/create-skill.dto';
import { UpdateSkillDto } from './dto/update-skill.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('skills')
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  @ApiQuery({ name: 'category', required: false })
  async findAll(@Query('category') category?: string) {
    return this.skillsService.findAll(category);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.skillsService.findOne(id);
  }

  @Post()
  async create(@Body() createSkillDto: CreateSkillDto) {
    return this.skillsService.create(createSkillDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSkillDto: UpdateSkillDto) {
    return this.skillsService.update(id, updateSkillDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.skillsService.remove(id);
  }
}