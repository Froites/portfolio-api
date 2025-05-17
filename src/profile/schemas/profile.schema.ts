import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProfileDocument = Profile & Document;

@Schema()
export class SocialLinks {
  @Prop()
  github?: string;

  @Prop()
  linkedin?: string;

  @Prop()
  twitter?: string;

  @Prop()
  website?: string;

  @Prop([String])
  other?: string[];
}

@Schema()
export class Profile {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  role: string;

  @Prop()
  avatarUrl: string;

  @Prop()
  coverUrl: string;

  @Prop()
  location: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  summary: string;

  @Prop({ type: SocialLinks })
  socialLinks: SocialLinks;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);