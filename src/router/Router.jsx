import { PATH } from 'constants/RouteConstants';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LoginScreen from 'screens/LoginScreen';
import RegisterScreen from 'screens/RegisterScreen/index.js';
import HomeScreen from 'screens/Home/HomeScreen';

export function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={PATH.HOME}>
          <HomeScreen />
        </Route>
        <Route exact path={PATH.REGISTER_PAGE}>
          <RegisterScreen />
        </Route>
        <Route exact path={PATH.LOGIN_PAGE}>
          <LoginScreen />
        </Route>
        <Route exact path={PATH.USER_ACCOUNT}>
          <LoginScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
