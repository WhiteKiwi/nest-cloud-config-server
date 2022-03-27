import { Request } from 'express';

/**
 * AuthenticatorModule은 AUTHENTICATOR_KEY exports 해야함
 */
export const AUTHENTICATOR_KEY = Symbol('AUTHENTICATOR_KEY');

export interface Authenticator {
	/**
	 * dto 인증 후 response data를 반환합니다
	 * @throws UnauthorizedException 인증 실패
	 * @returns response data
	 */
	auth(dto: any): Promise<any>;

	/**
	 * 요청을 validate 한 후 payload를 반환합니다
	 * @throws UnauthorizedException 인증 실패
	 */
	validate(req: Request): any;
}
