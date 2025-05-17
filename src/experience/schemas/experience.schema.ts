import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ExperienceDocument = Experience & Document;

@Schema()
export class Experience {
  @Prop({ required: true })
  company: string;

  @Prop({ required: true })
  role: string;

  @Prop({ required: true })
  startDate: string; // Formato 'YYYY-MM'

  @Prop() // Opcional para empregos atuais
  endDate?: string; // Formato 'YYYY-MM' ou 'Atual'

  @Prop([String])
  description: string[];

  @Prop([String])
  achievements: string[];

  @Prop([String])
  technologies: string[]; // Lista de tecnologias utilizadas
}

export const ExperienceSchema = SchemaFactory.createForClass(Experience);