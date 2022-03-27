import { Module } from '@nestjs/common';

import { AUTH_DATA_STORAGE_KEY } from './auth.data-storage';
import { SampleDataStorage } from './impl';

@Module({
	providers: [
		{
			provide: AUTH_DATA_STORAGE_KEY,
			useClass: SampleDataStorage,
		},
	],
	exports: [AUTH_DATA_STORAGE_KEY],
})
export class AuthDataStorageModule {}
