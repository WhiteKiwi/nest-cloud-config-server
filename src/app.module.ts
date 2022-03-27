import { HealthCheckModule } from '@kiwi-lib/nestjs';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule, CloudConfigModule } from './modules';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: '.env',
			cache: true,
		}),
		HealthCheckModule,
		CloudConfigModule,
		AuthModule,
	],
})
export class AppModule {}
