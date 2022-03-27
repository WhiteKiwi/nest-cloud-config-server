import { Injectable, NotFoundException } from '@nestjs/common';

import { Authenticator } from '../../authenticator';

@Injectable()
export class NoAuthenticator implements Authenticator {
	async auth(): Promise<never> {
		throw new NotFoundException();
	}

	async validate() {
		return {};
	}
}
