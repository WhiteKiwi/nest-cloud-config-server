import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';
import { JwtAuthenticatorModule } from './authenticators';

@Module({
	imports: [PassportModule, JwtAuthenticatorModule],
	controllers: [AuthController],
	providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
