import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProjectDocument = Project & Document;

@Schema()
export class Project {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ required: true })
  bgColor: string;

  @Prop()
  url?: string;

  @Prop([String])
  technologies: string[];

  @Prop({ required: true })
  category: string;

  @Prop({ default: false })
  featured: boolean;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);