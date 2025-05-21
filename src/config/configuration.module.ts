import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.${process.env.NODE_ENV || 'development'}`, '.env'],
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test')
          .default('development'),
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required(),
        API_KEY: Joi.string().required().min(20), // Força uma API key mais forte
        API_KEY_EXPIRES_IN: Joi.string().optional(), // Opcional para implementação futura
        LOG_LEVEL: Joi.string()
          .valid('verbose', 'debug', 'log', 'warn', 'error')
          .default('log'),
      }),
      validationOptions: {
        allowUnknown: true, // Permite variáveis de ambiente não declaradas no schema
        abortEarly: true, // Para mais rapidamente quando encontrar um erro
      },
    }),
  ],
})
export class ConfigurationModule {}