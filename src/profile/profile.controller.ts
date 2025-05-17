import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async findOne() {
    return this.profileService.findOne();
  }

  @Post()
  @UseGuards(ApiKeyGuard)
  async create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @Put()
  @UseGuards(ApiKeyGuard)
  async update(@Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(updateProfileDto);
  }
}