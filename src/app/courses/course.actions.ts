import { createAction, props } from '@ngrx/store';
import { ALL_COURSES_LOADED, COURSE_UPDATED, LOAD_ALL_COURSES } from './course-actions.types';
import { Course } from './model/course';
import { Update } from '@ngrx/entity';

export const loadAllCourses = createAction(
	LOAD_ALL_COURSES
);

export const allCoursesLoaded = createAction(
	ALL_COURSES_LOADED,
	props<{ courses: Course[] }>()
);

export const courseUpdated = createAction(
	COURSE_UPDATED,
	props<{ update: Update<Course> }>()
);
