import { Inject, Module, OnModuleInit } from '@nestjs/common';

import { configsDirPath } from '../../config';
import { DataStorage } from '../data-storage';
import { DATA_STORAGE_KEY } from './constants';
import { YmlFileDataStorage } from './impl';

@Module({
	providers: [
		{
			provide: DATA_STORAGE_KEY,
			useFactory: () => {
				return new YmlFileDataStorage(configsDirPath);
			},
		},
	],
	exports: [DATA_STORAGE_KEY],
})
export class DataStorageModule implements OnModuleInit {
	constructor(
		@Inject(DATA_STORAGE_KEY)
		private readonly dataStorage: DataStorage,
	) {}

	async onModuleInit() {
		await this.dataStorage.initialize?.();
	}
}
