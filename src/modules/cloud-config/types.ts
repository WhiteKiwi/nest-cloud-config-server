export type Config<T = unknown> = {
	group: string;
	value: Record<string, T>;
};
