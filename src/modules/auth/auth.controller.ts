import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

@Controller({
	version: '1',
	path: 'auth',
})
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() dto: any): Promise<any> {
		return await this.authService.login(dto);
	}
}
