import { IsArray, IsHexColor, IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateSkillDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  icon: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(100)
  level: number;

  @IsNotEmpty()
  @IsHexColor()
  color: string;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  connections: string[] = [];
}