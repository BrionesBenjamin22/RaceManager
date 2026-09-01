import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-proto';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-proto';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { NodeSDK } from '@opentelemetry/sdk-node';

const telemetryDisabled = ['1', 'true'].includes(
  process.env.OTEL_SDK_DISABLED?.toLowerCase() ?? '',
);

let sdk: NodeSDK | undefined;

if (!telemetryDisabled) {
  sdk = new NodeSDK({
    serviceName: process.env.OTEL_SERVICE_NAME ?? 'mtb-rescue-backend',
    traceExporter: new OTLPTraceExporter(),
    metricReaders: [
      new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter(),
      }),
    ],
    instrumentations: [getNodeAutoInstrumentations()],
  });

  sdk.start();
}

export async function shutdownTelemetry(): Promise<void> {
  await sdk?.shutdown();
}
