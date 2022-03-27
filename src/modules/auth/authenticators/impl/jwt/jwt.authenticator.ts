import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { omit } from 'lodash';
import { ExtractJwt, JwtFromRequestFunction } from 'passport-jwt';

import { AUTH_DATA_STORAGE_KEY, AuthDataStorage } from '../../../data-storage';
import { Authenticator } from '../../authenticator';
import { AuthDto } from './auth.dto';

type User = {
	id: string;
	password: string;
};

@Injectable()
export class JwtAuthenticator implements Authenticator {
	private readonly jwtFromRequestFunction: JwtFromRequestFunction =
		ExtractJwt.fromAuthHeaderAsBearerToken();

	constructor(
		@Inject(AUTH_DATA_STORAGE_KEY)
		private readonly dataStorage: AuthDataStorage<User>,
		private readonly jwtService: JwtService,
	) {}

	async auth(dto: any): Promise<any> {
		this.validateDto(dto);

		const user = await this.dataStorage.load(dto.id);

		this.validateUser(dto, user);

		const accessToken = await this.jwtService.signAsync(omit(user, 'password'));
		return { accessToken };
	}

	private validateDto(dto: any): asserts dto is AuthDto {
		if (typeof dto.id !== 'string') throw new UnauthorizedException();
		if (typeof dto.password !== 'string') throw new UnauthorizedException();
	}

	private validateUser(dto: AuthDto, user?: User): asserts user is User {
		if (!user) {
			throw new UnauthorizedException();
		}

		// TODO: dto.password + salt의 해시랑 user.password 비교
		if (dto.password !== user.password) {
			throw new UnauthorizedException();
		}
	}

	async validate(req: Request) {
		const token = this.jwtFromRequestFunction(req);

		if (!token) {
			throw new UnauthorizedException();
		}

		return await this.jwtService.verifyAsync(token);
	}
}
