import { ConfigAuthGuard } from '@modules/auth';
import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';

import { CloudConfigService } from './cloud-config.service';

@UseGuards(ConfigAuthGuard)
@Controller({
	version: '1',
})
export class CloudConfigController {
	constructor(private readonly cloudConfigService: CloudConfigService) {}

	// TODO: encrypt, decrypt api 추가

	@HttpCode(HttpStatus.OK)
	@Post('encrypt')
	encrypt(@Body() data: { value: string }): string {
		return this.cloudConfigService.encrypt(data.value);
	}

	@HttpCode(HttpStatus.OK)
	@Post('decrypt')
	decrypt(@Body() data: { value: string }): string {
		return this.cloudConfigService.decrypt(data.value);
	}

	@Get(':configGroup')
	getConfig(@Param('configGroup') configGroup: string): unknown {
		return this.cloudConfigService.getConfigValue(configGroup);
	}
}
