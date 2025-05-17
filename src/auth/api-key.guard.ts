import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  // Idealmente, isso viria de uma variável de ambiente
  private readonly API_KEY = 'your-secret-api-key';

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['x-api-key'];

    if (!apiKey || apiKey !== this.API_KEY) {
      throw new UnauthorizedException('API key inválida');
    }

    return true;
  }
}