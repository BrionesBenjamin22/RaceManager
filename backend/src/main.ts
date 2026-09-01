import { shutdownTelemetry } from './instrumentation.js';
import { ConsoleLogger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const logger = new ConsoleLogger({
    colors: false,
    flattenParams: true,
    json: true,
  });
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  let shutdownPromise: Promise<void> | undefined;
  const shutdown = (signal: NodeJS.Signals): Promise<void> => {
    shutdownPromise ??= (async () => {
      logger.log('Application shutdown started', {
        'event.name': 'application.shutdown.started',
        signal,
      });
      await app.close();
      await shutdownTelemetry();
    })();

    return shutdownPromise;
  };

  process.once('SIGINT', () => void shutdown('SIGINT'));
  process.once('SIGTERM', () => void shutdown('SIGTERM'));
  await app.listen(process.env.PORT ?? 3000);
}

try {
  await bootstrap();
} catch (error) {
  await shutdownTelemetry();
  throw error;
}
