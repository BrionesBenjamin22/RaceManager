import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ObservabilityModule } from './observability/observability.module.js';
import { PrismaService } from './prisma.service.js';

@Module({
  imports: [ObservabilityModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
