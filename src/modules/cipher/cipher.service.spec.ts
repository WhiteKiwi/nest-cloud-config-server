import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { CipherService } from './cipher.service';

describe('CipherService', () => {
	let cipherService: CipherService;

	beforeEach(async () => {
		const sample: TestingModule = await Test.createTestingModule({
			imports: [ConfigModule],
			providers: [CipherService],
		}).compile();

		cipherService = sample.get<CipherService>(CipherService);
	});

	it('암호화된 값은 원래 문자열과 달라야 함', () => {
		const text = 'text';
		const encrypted = cipherService.encrypt(text);

		expect(encrypted).not.toBe(text);
	});

	it('암호화후 복호화한 값은 원래 문자열과 같아야 함', () => {
		const text = 'text';
		const encrypted = cipherService.encrypt(text);
		const decrypted = cipherService.decrypt(encrypted);

		expect(decrypted).toBe(text);
	});
});
