import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiQuery({ name: 'technology', required: false })
  async findAll(@Query('technology') technology?: string) {
    return this.projectsService.findAll(technology);
  }

  @Get('featured')
  async findFeatured() {
    return this.projectsService.findFeatured();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectsService.create(createProjectDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(id, updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.projectsService.remove(id);
  }
}