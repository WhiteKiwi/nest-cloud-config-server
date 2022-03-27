export interface DataStorage<T extends KeyValueMapping<any, any> = any> {
	initialize?(): void | Promise<void>;
	load<K extends KeyType<T>>(key: K): Promise<T[K]> | undefined;
	save<K extends KeyType<T>>(key: K, value: T[K]): Promise<void>;
}

type KeyValueMapping<K extends string, V> = {
	[key in K]: V;
};

type KeyType<T extends KeyValueMapping<any, any>> = T extends KeyValueMapping<
	infer K,
	infer V
>
	? K
	: never;
