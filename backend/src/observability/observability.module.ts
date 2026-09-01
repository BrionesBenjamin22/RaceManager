import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RequestObservabilityInterceptor } from './request-observability.interceptor.js';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestObservabilityInterceptor,
    },
  ],
})
export class ObservabilityModule {}
