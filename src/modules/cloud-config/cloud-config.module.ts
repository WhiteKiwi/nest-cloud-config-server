import { Module } from '@nestjs/common';

import { CipherModule } from '../cipher';
import { DATA_STORAGE_KEY, DataStorageModule } from '../data-storage';
import { CloudConfigController } from './cloud-config.controller';
import { CloudConfigService } from './cloud-config.service';
import { CONFIG_DATA_STORAGE_KEY } from './constants';

@Module({
	imports: [CipherModule, DataStorageModule],
	controllers: [CloudConfigController],
	providers: [
		CloudConfigService,
		{
			provide: CONFIG_DATA_STORAGE_KEY,
			useExisting: DATA_STORAGE_KEY,
		},
	],
})
export class CloudConfigModule {}
