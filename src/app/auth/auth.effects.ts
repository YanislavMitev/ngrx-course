import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthenticationActions } from './action-types';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
	login$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthenticationActions.login),
			tap(action => {
				localStorage.setItem('user', JSON.stringify(action.user));
			})
		),
	{ dispatch: false }
	);

	logout$ = createEffect(() =>
		this.actions$.pipe(
			ofType(AuthenticationActions.logout),
			tap(action => {
				localStorage.removeItem('user');

				this.router.navigateByUrl('/login');
			})
		),
	{ dispatch: false }
	);

	constructor(private readonly actions$: Actions, private readonly router: Router) {

	}
}
