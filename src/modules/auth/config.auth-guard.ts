import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class ConfigAuthGuard extends AuthGuard('custom') {}
