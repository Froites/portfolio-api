import { CommandFactory } from 'nest-commander';
import { SeedModule } from './seed/seed.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('SeedCLI');
  
  try {
    logger.log('Starting seed command...');
    await CommandFactory.run(SeedModule, ['log', 'error', 'warn']);
    logger.log('Seed command completed successfully');
    process.exit(0);
  } catch (error) {
    logger.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
}

bootstrap();