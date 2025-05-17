import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SocialLinksDto {
  @IsOptional()
  @IsString()
  github?: string;

  @IsOptional()
  @IsString()
  linkedin?: string;

  @IsOptional()
  @IsString()
  twitter?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsString({ each: true })
  other?: string[];
}

export class CreateProfileDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsString()
  coverUrl: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  summary: string;

  @IsOptional()
  socialLinks: SocialLinksDto;
}