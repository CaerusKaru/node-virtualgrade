import {UPLOAD_ROUTE} from './upload';
import {HOME_ROUTE} from './home';
import {LOGOUT_ROUTE} from './logout';
import {LOGIN_ROUTE} from './login';
import {RouteConfiguration} from 'hapi';

export const ROUTES: RouteConfiguration[] = [
  UPLOAD_ROUTE,
  HOME_ROUTE,
  LOGOUT_ROUTE,
  LOGIN_ROUTE
];
