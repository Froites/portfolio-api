import { IsArray, IsHexColor, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateServiceDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  details: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  technologies: string[] = [];
}