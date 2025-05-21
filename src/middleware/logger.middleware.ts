import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    
    // Registra na entrada da requisição
    this.logger.log(
      `${method} ${originalUrl} - ${ip} - ${userAgent}`,
    );

    // Captura o tempo de início
    const startTime = Date.now();

    // Registra na saída com código de status e tempo de resposta
    res.on('finish', () => {
      const { statusCode } = res;
      const responseTime = Date.now() - startTime;
      
      // Verifica se houve erro
      if (statusCode >= 400) {
        this.logger.error(
          `${method} ${originalUrl} - ${statusCode} - ${responseTime}ms`,
        );
      } else {
        this.logger.log(
          `${method} ${originalUrl} - ${statusCode} - ${responseTime}ms`,
        );
      }
    });

    next();
  }
}