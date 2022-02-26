import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CloudConfigModule } from './modules';

@Module({
	imports: [CloudConfigModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
