import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly logger = new Logger(ApiKeyGuard.name);
  
  constructor(
    private configService: ConfigService,
    private reflector: Reflector
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Verifica se a rota está marcada como pública
    const isPublic = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [
        context.getHandler(),
        context.getClass(),
      ]
    );

    // Se for rota pública, permite o acesso sem autenticação
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = this.extractApiKey(request);
    const validApiKey = this.configService.get<string>('API_KEY');

    if (!apiKey || !validApiKey || !this.validateApiKey(apiKey, validApiKey)) {
      this.logger.warn(`Tentativa de acesso não autorizado de ${request.ip} para ${request.path}`);
      throw new UnauthorizedException('API key inválida ou não fornecida');
    }

    return true;
  }

  private extractApiKey(request: Request): string | undefined {
    // Verificar primeiro no header x-api-key (preferencial)
    const headerKey = request.headers['x-api-key'];
    if (headerKey) return Array.isArray(headerKey) ? headerKey[0] : headerKey;
    
    // Alternativa: verificar em Authorization: Bearer <token>
    const authHeader = request.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    // Último recurso: verificar na query string (menos seguro)
    return request.query.apiKey as string;
  }

  private validateApiKey(providedKey: string, validKey: string): boolean {
    // Comparação em tempo constante para evitar timing attacks
    if (!providedKey || !validKey) return false;
    
    let result = providedKey.length === validKey.length;
    let diff = 0;
    
    for (let i = 0; i < providedKey.length && i < validKey.length; i++) {
      diff |= providedKey.charCodeAt(i) ^ validKey.charCodeAt(i);
    }
    
    return result && diff === 0;
  }
}