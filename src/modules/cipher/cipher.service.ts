import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AES, enc } from 'crypto-js';

import { Env } from '../../config';

@Injectable()
export class CipherService {
	private readonly ENCRYPT_KEY: string;

	constructor(configService: ConfigService<Env>) {
		this.ENCRYPT_KEY = configService.get('ENCRYPT_KEY') || 'ENCRYPT_KEY';
	}

	encrypt(data: string): string {
		// TODO: data source + salt 붙여서 Spring cloud config와 동일하게 동작하도록 만들기
		return AES.encrypt(data, this.ENCRYPT_KEY).toString();
	}

	decrypt(encrypted: string): string {
		return AES.decrypt(encrypted, this.ENCRYPT_KEY).toString(enc.Utf8);
	}
}
