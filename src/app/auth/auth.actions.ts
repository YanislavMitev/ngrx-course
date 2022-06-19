import { createAction, props } from '@ngrx/store';
import { User } from './model/user.model';
import { LOGIN_ACTION, LOGOUT_ACTION } from './action-types';

export const login = createAction(
	LOGIN_ACTION,
	props<{ user: User }>()
);

export const logout = createAction(
	LOGOUT_ACTION
);
