import { Controller, Get, Param } from '@nestjs/common';

import { CloudConfigService } from './cloud-config.service';

@Controller(':configGroup')
export class CloudConfigController {
	constructor(private readonly cloudConfigService: CloudConfigService) {}

	@Get()
	getConfig(@Param('configGroup') configGroup: string): unknown {
		return this.cloudConfigService.getConfigValue(configGroup) || {};
	}
}
