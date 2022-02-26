import { HealthCheckModule } from '@kiwi-lib/nestjs';
import { Module } from '@nestjs/common';

import { CloudConfigModule } from './modules';

@Module({
	imports: [HealthCheckModule, CloudConfigModule],
})
export class AppModule {}
