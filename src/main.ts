import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Env } from './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);

	const configService: ConfigService<Env> = app.get(ConfigService);
	const port = configService.get<number>('PORT') || 3000;

	await app.listen(port, () => {
		console.log(`SERVER LISTENING ON port ${port}`);
	});
}
bootstrap();
