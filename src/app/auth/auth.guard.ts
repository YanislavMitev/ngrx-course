import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from '../reducers';
import { select, Store } from '@ngrx/store';
import { isLoggedIn } from './auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly store: Store<AppState>, private readonly router: Router) {
		// No ops.
	}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
		return this.store.pipe(
			select(isLoggedIn),
			tap(loggedIn => {
				if (!loggedIn) {
					this.router.navigateByUrl('/login')
				}
			})
		)
	}
}
