import { Module } from '@nestjs/common';

import { CipherService } from './cipher.service';

@Module({
	providers: [CipherService],
	exports: [CipherService],
})
export class CipherModule {}
