import { Module, OnModuleInit } from '@nestjs/common';

import { configsDirPath } from '../../config';
import { CipherModule } from '../cipher';
import { CloudConfigController } from './cloud-config.controller';
import { CloudConfigService } from './cloud-config.service';
import { CONFIG_MAP_KEY } from './constants';

@Module({
	imports: [CipherModule],
	controllers: [CloudConfigController],
	providers: [
		CloudConfigService,
		{
			provide: CONFIG_MAP_KEY,
			useValue: new Map<string, unknown>(),
		},
	],
})
export class CloudConfigModule implements OnModuleInit {
	constructor(private readonly cloudConfigService: CloudConfigService) {}

	async onModuleInit() {
		await this.cloudConfigService.load(configsDirPath);
	}
}
