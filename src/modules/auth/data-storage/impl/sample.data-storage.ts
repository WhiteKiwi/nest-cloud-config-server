import { AuthDataStorage } from '../auth.data-storage';

export class SampleDataStorage
	implements AuthDataStorage<{ id: string; password: string }>
{
	/**
	 *
	 * @param key user id
	 */
	async load(key: string) {
		void key;

		return {
			id: 'sample',
			password: 'sample',
		};
	}

	async save(): Promise<never> {
		throw new Error('Method not implemented.');
	}
}
