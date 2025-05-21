import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  // Determina os níveis de log com base na variável de ambiente
  const logLevel = process.env.LOG_LEVEL || 'log';
  const logLevels: ('error' | 'warn' | 'log' | 'debug' | 'verbose')[] = (() => {
    switch (logLevel) {
      case 'verbose': return ['error', 'warn', 'log', 'debug', 'verbose'];
      case 'debug': return ['error', 'warn', 'log', 'debug'];
      case 'log': return ['error', 'warn', 'log'];
      case 'warn': return ['error', 'warn'];
      case 'error': return ['error'];
      default: return ['error', 'warn', 'log'];
    }
  })();
  
  const app = await NestFactory.create(AppModule, {
    logger: logLevels,
  });
  
  const configService = app.get(ConfigService);
  const isProd = configService.get('NODE_ENV') === 'production';
  const logger = new Logger('Bootstrap');
  
  // Adiciona Helmet para proteção HTTP adicional
  app.use(helmet());
  
  // Configura CORS baseado no ambiente
  if (process.env.NODE_ENV === 'production') {
    app.enableCors({
      origin: [
        'https://portfolio-app-woad-xi.vercel.app', // Seu URL real na Vercel
        'http://localhost:5173' // Para desenvolvimento local
      ],
      methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
      credentials: false,
      preflightContinue: false,
      optionsSuccessStatus: 204
    });
    console.log('CORS configurado para produção');
  } else {
    app.enableCors({
      origin: '*', // Mais permissivo para desenvolvimento
      methods: 'GET,OPTIONS,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
    });
    console.log('CORS configurado para desenvolvimento');
  }
  
  // Validação de dados de entrada mais rigorosa
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Remove propriedades não esperadas
    forbidNonWhitelisted: true, // Rejeita requisições com propriedades não esperadas
    transform: true, // Converte automaticamente os tipos de dados
    transformOptions: {
      enableImplicitConversion: false, // Força conversões explícitas para maior segurança
    },
  }));
  
  // Configuração do Swagger mais segura
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API para gerenciar dados do portfólio')
    .setVersion('1.0')
    .addTag('portfolio')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'x-api-key' }, 'x-api-key')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  
  // Em produção, podemos adicionar proteção ao Swagger
  if (isProd) {
    app.enableCors({
      origin: [
        'https://portfolio-app-4gcn.vercel.app', // URL do seu frontend no Render
        // 'https://seuportfolio.com', // Seu domínio personalizado se tiver
        'http://localhost:5173' // Mantenha para testes locais
      ],
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: false, // Para maior segurança em produção
    });
    logger.log('CORS configurado para produção');
  } else {
    SwaggerModule.setup('api', app, document);
  }
  
  // Inicia o servidor
  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  logger.log(`Aplicação rodando na porta ${port}`);
  logger.log(`Ambiente: ${configService.get('NODE_ENV')}`);
}

bootstrap();