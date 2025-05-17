import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SkillDocument = Skill & Document;

@Schema()
export class Skill {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  icon: string; // Nome do ícone (ex: 'FaReact', 'FaNodeJs')

  @Prop({ required: true, min: 0, max: 100 })
  level: number;

  @Prop({ required: true })
  color: string; // Código de cor em hexadecimal

  @Prop({ required: true })
  category: string; // 'frontend', 'backend', 'devops', etc.

  @Prop([String])
  connections: string[]; // IDs de outras habilidades relacionadas
}

export const SkillSchema = SchemaFactory.createForClass(Skill);