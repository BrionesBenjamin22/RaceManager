import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma.service.js';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('x-request-id', /^[A-Za-z0-9._-]{1,128}$/)
      .expect('Hello World!');
  });

  it('preserves a valid request correlation id', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('x-request-id', 'test-request-123')
      .expect(200)
      .expect('x-request-id', 'test-request-123');
  });

  it('replaces an invalid request correlation id', () => {
    return request(app.getHttpServer())
      .get('/')
      .set('x-request-id', 'invalid request id')
      .expect(200)
      .expect('x-request-id', /^[A-Za-z0-9._-]{1,128}$/)
      .expect((response) => {
        expect(response.headers['x-request-id']).not.toBe('invalid request id');
      });
  });

  afterEach(async () => {
    await app.close();
  });
});
