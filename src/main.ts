import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Ajuste para a porta do seu frontend Vite/React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Validação de entrada
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  
  // Configuração do Swagger para documentação da API
  const config = new DocumentBuilder()
    .setTitle('Portfolio API')
    .setDescription('API para gerenciar dados do portfólio')
    .setVersion('1.0')
    .addTag('portfolio')
    .build();
    
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();