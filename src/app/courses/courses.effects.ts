import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseActions } from './action-types';
import { concatMap, map } from 'rxjs/operators';
import { CoursesHttpService } from './services/courses-http.service';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CoursesEffects {
	loadCourses$ = createEffect(
		() => this.actions$.pipe(
			ofType(CourseActions.loadAllCourses),
			concatMap(actions => this.coursesHttpService.findAllCourses()),
			map(courses => allCoursesLoaded({ courses }))
		)
	);

	saveCourse$ = createEffect(
		() => this.actions$.pipe(
			ofType(CourseActions.courseUpdated),
			concatMap(action => this.coursesHttpService.saveCourse(action.update.id, action.update.changes))
		),
		{ dispatch: false } // we don't want the effect to dispatch another action
	)
	constructor(private readonly actions$: Actions,
				private readonly coursesHttpService: CoursesHttpService) {
	}
}
