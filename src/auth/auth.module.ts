import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiKeyGuard } from './api-key.guard';
import { APP_GUARD } from '@nestjs/core';

@Global() // Torna o módulo global para facilitar o uso em toda a aplicação
@Module({
  imports: [ConfigModule],
  providers: [
    ApiKeyGuard,
    // Registra o ApiKeyGuard como um guard global
    {
      provide: APP_GUARD,
      useClass: ApiKeyGuard,
    }
  ],
  exports: [ApiKeyGuard],
})
export class AuthModule {}