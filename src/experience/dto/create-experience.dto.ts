import { IsArray, IsNotEmpty, IsOptional, IsString, Matches } from 'class-validator';

export class CreateExperienceDto {
  @IsNotEmpty()
  @IsString()
  company: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{4}-\d{2}$/, { message: 'startDate deve estar no formato YYYY-MM' })
  startDate: string;

  @IsOptional()
  @IsString()
  @Matches(/^\d{4}-\d{2}$|^Atual$/, { message: 'endDate deve estar no formato YYYY-MM ou ser igual a "Atual"' })
  endDate?: string;

  @IsArray()
  @IsString({ each: true })
  description: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  achievements: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies: string[] = [];
}