import { HttpStatus, INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as supertest from 'supertest';

import { AppModule } from '../../src/app.module';

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let request: supertest.SuperTest<supertest.Test>;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
		request = supertest(app.getHttpServer());
	});

	it('/health-check (GET)', async () => {
		const { status, body } = await request.get('/health-check');

		expect(status).toBe(HttpStatus.OK);
		expect(typeof body.version).toBe('string');
		expect(typeof body.now).toBe('string');
	});
});
