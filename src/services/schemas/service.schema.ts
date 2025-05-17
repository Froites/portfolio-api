import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema()
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  icon: string; // Nome do ícone (ex: 'FaLaptopCode')

  @Prop({ required: true })
  color: string; // Código de cor em hexadecimal

  @Prop([String])
  details: string[]; // Lista de características do serviço

  @Prop([String])
  technologies: string[]; // Lista de tecnologias relacionadas
}

export const ServiceSchema = SchemaFactory.createForClass(Service);