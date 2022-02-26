import { Controller, Get, Param } from '@nestjs/common';

import { CloudConfigService } from './cloud-config.service';

@Controller()
export class CloudConfigController {
	constructor(private readonly cloudConfigService: CloudConfigService) {}

	// TODO: encrypt, decrypt api 추가

	@Get(':configGroup')
	getConfig(@Param('configGroup') configGroup: string): unknown {
		return this.cloudConfigService.getConfigValue(configGroup) || {};
	}
}
