export interface DataStorage<T = unknown> {
	initialize?(): void | Promise<void>;
	load(key: string): T | Promise<T> | undefined;
	save(key: string, value: T): void | Promise<void>;
}
