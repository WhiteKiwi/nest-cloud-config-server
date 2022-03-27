import { Env } from '@config/env';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthDataStorageModule } from '../../../data-storage';
import { AUTHENTICATOR_KEY } from '../../authenticator';
import { JwtAuthenticator } from './jwt.authenticator';

@Module({
	imports: [
		AuthDataStorageModule,
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService<Env>) => {
				return {
					secret: configService.get('JWT_SECRET'),
					signOptions: { expiresIn: '90d' },
				};
			},
		}),
	],
	providers: [
		{
			provide: AUTHENTICATOR_KEY,
			useClass: JwtAuthenticator,
		},
	],
	exports: [AUTHENTICATOR_KEY],
})
export class JwtAuthenticatorModule {}
