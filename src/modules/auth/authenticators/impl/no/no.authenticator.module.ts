import { Module } from '@nestjs/common';

import { AUTHENTICATOR_KEY } from '../../authenticator';
import { NoAuthenticator } from './no.authenticator';

@Module({
	providers: [
		{
			provide: AUTHENTICATOR_KEY,
			useClass: NoAuthenticator,
		},
	],
	exports: [AUTHENTICATOR_KEY],
})
export class NoAuthenticatorModule {}
