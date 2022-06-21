import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';
import { authReducer } from './auth/reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as fromApp from './reducers';
import { AuthGuard } from './auth/auth.guard';
import { EffectsModule } from '@ngrx/effects';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { metaReducers, reducers } from './reducers';

const routes: Routes = [
	{
		path: 'courses',
		canActivate: [AuthGuard],
		loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
	},
	{
		path: '**',
		redirectTo: '/'
	}
];

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
		HttpClientModule,
		MatMenuModule,
		MatIconModule,
		MatSidenavModule,
		MatProgressSpinnerModule,
		MatListModule,
		MatToolbarModule,
		AuthModule.forRoot(),
		StoreModule.forRoot(reducers, { metaReducers,
			runtimeChecks: {
				strictStateImmutability: true,
				strictActionImmutability: true,
				strictActionSerializability: true,
				strictStateSerializability: true
			}
		}),
		StoreDevtoolsModule.instrument({ maxAge: 25 }),
		StoreModule.forFeature(fromApp.appFeatureKey, fromApp.reducers, { metaReducers: fromApp.metaReducers }),
		EffectsModule.forRoot([]),
		StoreRouterConnectingModule.forRoot({
			stateKey: 'router',
			routerState: RouterState.Minimal
		})
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
