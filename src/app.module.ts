import { HealthCheckModule } from '@kiwi-lib/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CloudConfigModule } from './modules';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
		}),
		HealthCheckModule,
		CloudConfigModule,
	],
})
export class AppModule {}
