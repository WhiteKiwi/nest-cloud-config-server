import { Inject, Injectable } from '@nestjs/common';

import { Authenticator, AUTHENTICATOR_KEY } from './authenticators';

@Injectable()
export class AuthService {
	constructor(
		@Inject(AUTHENTICATOR_KEY)
		private readonly authenticator: Authenticator,
	) {}

	async login(dto: any) {
		return await this.authenticator.auth(dto);
	}
}
