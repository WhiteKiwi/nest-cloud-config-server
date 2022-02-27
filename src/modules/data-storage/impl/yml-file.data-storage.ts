import { Inject, Injectable } from '@nestjs/common';
import { readdir, readFile } from 'fs/promises';
import { load as parseYml } from 'js-yaml';
import { join, parse as parsePath } from 'path';

import { DataStorage } from '../interface';

export class YmlFileDataStorage implements DataStorage {
	private readonly map: Map<string, unknown> = new Map<string, unknown>();

	constructor(private readonly dirPath: string) {}

	// dirPath 내부의 yml 파일들을 읽어서 데이터로 활용
	async initialize(): Promise<void> {
		const filePaths = await readdir(this.dirPath);

		for (const filePath of filePaths) {
			const { name: key, ext } = parsePath(filePath);
			if (ext !== '.yml') {
				console.warn(
					'파일의 확장자가 yml이 아닙니다.',
					`filePath: ${filePath}`,
				);
				continue;
			}

			const value = await this.loadFromYmlFile(join(this.dirPath, filePath));
			await this.save(key, value);
		}
	}

	// yml file 읽어서 파싱
	private async loadFromYmlFile(filePath: string): Promise<unknown> {
		const ymlStr = await readFile(filePath, { encoding: 'utf-8' });
		return parseYml(ymlStr);
	}

	load(key: string) {
		return this.map.get(key);
	}

	save(key: string, value: unknown) {
		this.map.set(key, value);
	}
}
