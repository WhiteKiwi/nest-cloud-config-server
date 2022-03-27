import { TransformResponseInterceptor } from '@core/interceptors';
import {
	RequestMethod,
	ValidationPipe,
	VERSION_NEUTRAL,
	VersioningType,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { Env } from './config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService: ConfigService<Env> = app.get(ConfigService);

	app.setGlobalPrefix('api', {
		exclude: [
			'docs',
			{
				method: RequestMethod.GET,
				path: 'health-check',
			},
		],
	});
	app.useGlobalPipes(new ValidationPipe({ transform: true }));
	app.useGlobalInterceptors(new TransformResponseInterceptor());
	app.enableVersioning({
		type: VersioningType.URI,
		defaultVersion: VERSION_NEUTRAL,
	});

	const port = configService.get<number>('PORT') || 3000;
	await app.listen(port, () => {
		console.log(`SERVER LISTENING ON port ${port}`);
	});
}
bootstrap();
