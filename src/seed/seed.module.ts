import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedCommand } from './seed.command';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Importação dos esquemas
import { Profile, ProfileSchema } from '../profile/schemas/profile.schema';
import { Skill, SkillSchema } from '../skills/schemas/skill.schema';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import { Service, ServiceSchema } from '../services/schemas/service.schema';
import { Experience, ExperienceSchema } from '../experience/schemas/experience.schema';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI') || 'mongodb://localhost:27027/portfolio',
      }),
      inject: [ConfigService],
    }),
    // Registro dos modelos
    MongooseModule.forFeature([
      { name: Profile.name, schema: ProfileSchema },
      { name: Skill.name, schema: SkillSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Service.name, schema: ServiceSchema },
      { name: Experience.name, schema: ExperienceSchema },
    ]),
  ],
  providers: [SeedCommand],
  exports: [SeedCommand],
})
export class SeedModule {}