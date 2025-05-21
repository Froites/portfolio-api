import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Public } from './auth/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public() // Marca esta rota como pública (não requer API key)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}