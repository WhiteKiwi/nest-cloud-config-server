import { DataStorage } from '@modules/data-storage';

export const AUTH_DATA_STORAGE_KEY = Symbol('AUTH_DATA_STORAGE_KEY');

export type AuthDataStorage<User = unknown> = DataStorage<{
	[userId: UserId]: User;
}>;

// `user_id:${userId}`
export type UserId = string;
