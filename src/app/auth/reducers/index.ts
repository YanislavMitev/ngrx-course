import { createReducer, on } from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthenticationActions } from '../action-types';

export interface AuthState {
	user: User;
}

export const initialAuthState: AuthState = {
	user: undefined
};

export const authReducer = createReducer(
	initialAuthState,
	on(
		AuthenticationActions.login, (state, action) => {
			return {
				user: action.user
			};
		})
);
