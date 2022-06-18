import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { login } from '../auth.actions';
import { noop } from 'rxjs';
import { AppState } from '../../reducers';

@Component({
	selector: 'login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form: FormGroup;

	constructor(
		private fb: FormBuilder,
		private auth: AuthService,
		private router: Router,
		private store: Store<AppState>) {

		this.form = fb.group({
			email: ['test@angular-university.io', [Validators.required]],
			password: ['test', [Validators.required]]
		});

	}

	ngOnInit() {

	}

	login() {
		const val = this.form.value;

		this.auth.login(val.email, val.password).pipe(
			tap(user => {
				console.log(user);

				this.store.dispatch(
					login({ user })
				);

				this.router.navigateByUrl('/courses');
			})
		).subscribe(
			noop,
			() => alert('Login Failed')
		);
	}

}

