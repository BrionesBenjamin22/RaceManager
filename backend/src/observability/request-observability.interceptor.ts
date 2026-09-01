import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { trace } from '@opentelemetry/api';
import { randomUUID } from 'node:crypto';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

type RoutedRequest = Request & {
  route?: { path?: string };
};

@Injectable()
export class RequestObservabilityInterceptor implements NestInterceptor {
  private readonly logger = new Logger(RequestObservabilityInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    if (context.getType() !== 'http') {
      return next.handle();
    }

    const http = context.switchToHttp();
    const request = http.getRequest<RoutedRequest>();
    const response = http.getResponse<Response>();
    const requestId = this.resolveRequestId(request);
    const startedAt = performance.now();
    const spanContext = trace.getActiveSpan()?.spanContext();
    let errorType: string | undefined;
    let errorStatus: number | undefined;

    response.setHeader('x-request-id', requestId);

    return next.handle().pipe(
      tap({
        error: (error: unknown) => {
          errorType = this.resolveErrorType(error);
          errorStatus =
            error instanceof HttpException ? error.getStatus() : 500;
        },
      }),
      finalize(() => {
        const statusCode = errorStatus ?? response.statusCode;
        const fields = {
          'event.name': 'http.server.request.completed',
          'http.request.method': request.method,
          'http.response.status_code': statusCode,
          'http.route': this.resolveRoute(request),
          duration_ms: Number((performance.now() - startedAt).toFixed(3)),
          'error.type': errorType,
          request_id: requestId,
          trace_id: spanContext?.traceId,
          span_id: spanContext?.spanId,
        };

        if (statusCode >= 500) {
          this.logger.error('HTTP request failed', fields);
        } else if (statusCode >= 400) {
          this.logger.warn('HTTP request rejected', fields);
        } else {
          this.logger.log('HTTP request completed', fields);
        }
      }),
    );
  }

  private resolveRequestId(request: Request): string {
    const header = request.headers['x-request-id'];
    const candidate = Array.isArray(header) ? header[0] : header;

    return candidate && /^[A-Za-z0-9._-]{1,128}$/.test(candidate)
      ? candidate
      : randomUUID();
  }

  private resolveRoute(request: RoutedRequest): string | undefined {
    if (!request.route?.path) {
      return undefined;
    }

    return `${request.baseUrl}${request.route.path}`;
  }

  private resolveErrorType(error: unknown): string {
    if (error instanceof HttpException) {
      const body = error.getResponse();

      if (
        typeof body === 'object' &&
        body !== null &&
        'code' in body &&
        typeof body.code === 'string'
      ) {
        return body.code;
      }
    }

    return error instanceof Error ? error.name : 'UnknownError';
  }
}
