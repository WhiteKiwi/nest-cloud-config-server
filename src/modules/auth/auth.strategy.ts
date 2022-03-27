import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-custom';

import { Authenticator, AUTHENTICATOR_KEY } from './authenticators';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
	constructor(
		@Inject(AUTHENTICATOR_KEY)
		private readonly authenticator: Authenticator,
	) {
		super();
	}

	async validate(req: Request) {
		return await this.authenticator.validate(req);
	}
}
