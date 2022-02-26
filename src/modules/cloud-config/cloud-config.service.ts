import { Inject, Injectable } from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import { load as parseYml } from 'js-yaml';
import { join, parse as parsePath } from 'path';
import { CONFIGS_MAP_KEY } from './constants';
import { Config } from './types';

@Injectable()
export class CloudConfigService {
	constructor(
		@Inject(CONFIGS_MAP_KEY)
		private readonly configMap: Map<string, unknown>,
	) {}

	getConfigValue(group: string): unknown {
		return this.configMap.get(group);
	}

	async load(configsDirPath: string): Promise<void> {
		const configs = await this.loadConfigsFromDir(configsDirPath);

		for (const config of configs) {
			this.configMap.set(config.group, config.value);
		}
	}

	private async loadConfigsFromDir(dirPath: string): Promise<Config[]> {
		const configs: Config[] = [];
		const filePaths = await readdir(dirPath);

		for (const filePath of filePaths) {
			const config = await this.loadConfigsFromYmlFile(join(dirPath, filePath));
			configs.push(config);
		}

		return configs;
	}

	private async loadConfigsFromYmlFile(filePath: string): Promise<Config> {
		const { name: group, ext } = parsePath(filePath);
		if (ext !== '.yml') {
			// TODO: 에러 정리
			throw new Error('파일의 확장자가 yml이 아닙니다.');
		}

		const ymlStr = await readFile(filePath, { encoding: 'utf-8' });
		const value = parseYml(ymlStr) as Record<string, unknown>;

		return {
			group,
			value,
		};
	}
}
