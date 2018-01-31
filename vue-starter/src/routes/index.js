import Routes from 'constants/routes';

// pages
import Users from 'pages/Users';
import User from 'pages/User';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

export default [
  { path: Routes.USERS, component: Users },
  { path: Routes.USER, component: User },
  { path: Routes.HOME, component: Home },
  { path: Routes.ALL, component: NotFound },
];
