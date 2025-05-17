import { IsArray, IsBoolean, IsHexColor, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  imageUrl: string;

  @IsNotEmpty()
  @IsHexColor()
  bgColor: string;

  @IsOptional()
  @IsUrl()
  url?: string;

  @IsArray()
  @IsString({ each: true })
  technologies: string[];

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsBoolean()
  featured: boolean = false;
}