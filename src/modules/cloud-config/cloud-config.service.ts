import { Inject, Injectable } from '@nestjs/common';

import { CipherService } from '../cipher';
import { DataStorage } from '../data-storage';
import { CONFIG_DATA_STORAGE_KEY } from './constants';

@Injectable()
export class CloudConfigService {
	constructor(
		@Inject(CONFIG_DATA_STORAGE_KEY)
		private readonly configDataStorage: DataStorage<{
			[key: string]: Record<string, unknown>;
		}>,
		private readonly cipherService: CipherService,
	) {}

	async getConfigValue(group: string): Promise<unknown> {
		const value = await this.configDataStorage.load(group);
		return this.decryptObject(value) || {};
	}

	private decryptObject(
		obj?: Record<string, unknown>,
	): Record<string, unknown> | undefined {
		if (!obj) return;

		for (const key of Object.keys(obj)) {
			const value = obj[key];
			if (typeof value === 'object') {
				obj[key] = this.decryptObject(obj[key] as Record<string, unknown>);
				continue;
			}
			if (typeof value === 'string') {
				if (value.startsWith('{cipher}'))
					obj[key] = this.decrypt(value.replace(/^\{cipher\}/, '') as string);
				continue;
			}
		}

		return obj;
	}

	encrypt(data: string): string {
		return this.cipherService.encrypt(data);
	}

	decrypt(encrypted: string): string {
		return this.cipherService.decrypt(encrypted);
	}
}
